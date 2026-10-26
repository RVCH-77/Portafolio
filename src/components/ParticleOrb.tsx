import React, { useEffect, useRef, useState } from 'react';

export interface ParticleOrbProps {
  imageSrc?: string;
  size?: number;
  className?: string;
  showControls?: boolean;
}

export interface OrbSettings {
  imageParticles: number;
  depth: number;
  sway: number;
  swayDuration: number;
  reveal: number;
  particleSize: number;
  brightness: number;
  colorMode: 'cyan' | 'real' | 'royal';
  preset: 'avatar' | 'react' | 'custom';
}

// Helpers de matrices WebGL 4x4
function mat4Perspective(out: Float32Array, fovyRad: number, aspect: number, near: number, far: number) {
  const f = 1.0 / Math.tan(fovyRad / 2);
  const nf = 1.0 / (near - far);
  out.fill(0);
  out[0] = f / aspect;
  out[5] = f;
  out[10] = (far + near) * nf;
  out[11] = -1.0;
  out[14] = (2.0 * far * near) * nf;
}

function mat4Multiply(out: Float32Array, a: Float32Array, b: Float32Array) {
  const a00 = a[0], a01 = a[1], a02 = a[2], a03 = a[3];
  const a10 = a[4], a11 = a[5], a12 = a[6], a13 = a[7];
  const a20 = a[8], a21 = a[9], a22 = a[10], a23 = a[11];
  const a30 = a[12], a31 = a[13], a32 = a[14], a33 = a[15];

  let b0 = b[0], b1 = b[1], b2 = b[2], b3 = b[3];
  out[0] = b0 * a00 + b1 * a10 + b2 * a20 + b3 * a30;
  out[1] = b0 * a01 + b1 * a11 + b2 * a21 + b3 * a31;
  out[2] = b0 * a02 + b1 * a12 + b2 * a22 + b3 * a32;
  out[3] = b0 * a03 + b1 * a13 + b2 * a23 + b3 * a33;

  b0 = b[4]; b1 = b[5]; b2 = b[6]; b3 = b[7];
  out[4] = b0 * a00 + b1 * a10 + b2 * a20 + b3 * a30;
  out[5] = b0 * a01 + b1 * a11 + b2 * a21 + b3 * a31;
  out[6] = b0 * a02 + b1 * a12 + b2 * a22 + b3 * a32;
  out[7] = b0 * a03 + b1 * a13 + b2 * a23 + b3 * a33;

  b0 = b[8]; b1 = b[9]; b2 = b[10]; b3 = b[11];
  out[8] = b0 * a00 + b1 * a10 + b2 * a20 + b3 * a30;
  out[9] = b0 * a01 + b1 * a11 + b2 * a21 + b3 * a31;
  out[10] = b0 * a02 + b1 * a12 + b2 * a22 + b3 * a32;
  out[11] = b0 * a03 + b1 * a13 + b2 * a23 + b3 * a33;

  b0 = b[12]; b1 = b[13]; b2 = b[14]; b3 = b[15];
  out[12] = b0 * a00 + b1 * a10 + b2 * a20 + b3 * a30;
  out[13] = b0 * a01 + b1 * a11 + b2 * a21 + b3 * a31;
  out[14] = b0 * a02 + b1 * a12 + b2 * a22 + b3 * a32;
  out[15] = b0 * a03 + b1 * a13 + b2 * a23 + b3 * a33;
}

function mat4FromRotationX(out: Float32Array, rad: number) {
  const c = Math.cos(rad);
  const s = Math.sin(rad);
  out.fill(0);
  out[0] = 1;
  out[5] = c;
  out[6] = s;
  out[9] = -s;
  out[10] = c;
  out[15] = 1;
}

function mat4FromRotationY(out: Float32Array, rad: number) {
  const c = Math.cos(rad);
  const s = Math.sin(rad);
  out.fill(0);
  out[0] = c;
  out[2] = -s;
  out[5] = 1;
  out[8] = s;
  out[10] = c;
  out[15] = 1;
}

function mat4FromRotationZ(out: Float32Array, rad: number) {
  const c = Math.cos(rad);
  const s = Math.sin(rad);
  out.fill(0);
  out[0] = c;
  out[1] = s;
  out[4] = -s;
  out[5] = c;
  out[10] = 1;
  out[15] = 1;
}

export const ParticleOrb: React.FC<ParticleOrbProps> = ({
  imageSrc = '/avatar.png',
  size = 520,
  className = '',
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);

  // Parámetros exactos fijados por el usuario
  const [settings] = useState<OrbSettings>({
    imageParticles: 8900,
    depth: 0.68,
    sway: 0.60,
    swayDuration: 20,
    reveal: 3.0,
    particleSize: 0.45,
    brightness: 1.9,
    colorMode: 'cyan',
    preset: 'avatar',
  });

  const [currentImageSrc] = useState(imageSrc);
  const [revealKey] = useState(0);

  const animFrameRef = useRef<number>(0);
  const glRef = useRef<WebGLRenderingContext | null>(null);

  // Físicas del orbe: jalar/deshacer y recuperar estado normal
  const physicsRef = useRef({
    rotX: 0.0,
    rotY: 0.0,
    targetRotX: 0.0,
    targetRotY: 0.0,
    pointerDown: false,
    startPointerX: 0,
    startPointerY: 0,
    currentPointerX: 0,
    currentPointerY: 0,
    pullDirX: 0.0,
    pullDirY: 0.0,
    pullDisperse: 0.0,
    pullDisperseVel: 0.0,
    targetDisperse: 0.0,
    hoverX: 0,
    hoverY: 0,
    squeeze: 1.0,
    squeezeVel: 0.0,
    revealProgress: 0.0,
    startTime: performance.now(),
  });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const gl = canvas.getContext('webgl', {
      alpha: true,
      antialias: true,
      premultipliedAlpha: false,
      powerPreference: 'high-performance',
    });

    if (!gl) {
      console.warn('WebGL no compatible');
      return;
    }
    glRef.current = gl;

    // --- SHADERS WEBGL CON EFECTO DE DESHACER Y RECUPERAR ---
    const vsSource = `
      attribute vec3 a_position;
      attribute vec4 a_color;
      attribute float a_size;
      attribute float a_type;    // 0.0 = Esfera exterior, 1.0 = Rostro/Imagen
      attribute vec3 a_scatter; // Vector de explosión y caos cuántico

      uniform mat4 u_mvp;
      uniform float u_reveal;
      uniform float u_particleSize;
      uniform float u_depth;
      uniform float u_time;
      uniform vec3 u_squeeze;
      uniform float u_pullDisperse;
      uniform vec2 u_pullDir;

      varying vec4 v_color;
      varying float v_type;

      void main() {
        v_type = a_type;
        vec3 pos = a_position;

        if (a_type > 0.5) {
          // Mantener la forma normal y relieve 3D del rostro
          pos.z *= (u_depth * 1.85);

          // --- EFECTO: CUANDO LO JALAS SE DESHACE LA CARA ---
          if (u_pullDisperse > 0.001) {
            float d = u_pullDisperse;

            // 1. Vector de estiramiento en la dirección del cursor
            vec3 dragOffset = vec3(u_pullDir.x, -u_pullDir.y, 0.0) * (d * 0.95);

            // 2. Desintegración caótica radial (nube de polvo estelar)
            vec3 scatterOffset = a_scatter * (d * 1.45 + d * d * 0.9);

            // 3. Vórtice gravitacional armónico
            float swirl = d * a_scatter.z * 4.0;
            float cs = cos(swirl);
            float sn = sin(swirl);
            vec2 swirled = vec2(pos.x * cs - pos.y * sn, pos.x * sn + pos.y * cs);
            pos.xy = mix(pos.xy, swirled, clamp(d * 0.5, 0.0, 0.85));

            pos += dragOffset + scatterOffset;
          }
        } else {
          // La esfera exterior se expande sutilmente cuando jalas
          if (u_pullDisperse > 0.001) {
            pos += normalize(pos) * (u_pullDisperse * 0.15);
          }
        }

        // Deformación física de apretón elástico
        pos *= u_squeeze;

        // Revelado progresivo armónico
        float r = clamp(u_reveal, 0.0, 1.0);
        float ease = 1.0 - pow(1.0 - r, 3.0);

        if (a_type < 0.5) {
          pos *= (0.2 + 0.8 * ease);
        } else {
          pos *= ease;
        }

        // Micro-ondulación orgánica de estrellas
        float sparkle = sin(u_time * 2.2 + a_position.x * 4.5 + a_position.y * 3.5) * 0.008;
        pos += normalize(pos + vec3(0.0001)) * sparkle;

        vec4 clipPos = u_mvp * vec4(pos, 1.0);
        gl_Position = clipPos;

        // Tamaño atenuado por perspectiva
        float distZ = max(0.2, clipPos.w);
        float pSize = (a_size * u_particleSize * 660.0) / distZ;
        gl_PointSize = clamp(pSize, 1.8, 48.0);

        // Alpha y color
        vec4 col = a_color;
        col.a *= ease;

        // Efecto Rim Light en el borde superior de la esfera (cúpula brillante celestial de la imagen 3)
        if (a_type < 0.5) {
          float rim = pow(clamp(length(pos.xy) / 1.15, 0.0, 1.0), 2.2);
          // Realzar borde blanco-cian
          col.rgb += vec3(0.35, 0.5, 0.75) * rim;
          col.a = mix(col.a, 1.0, rim * 0.6);
        }

        v_color = col;
      }
    `;

    const fsSource = `
      precision mediump float;
      varying vec4 v_color;
      varying float v_type;
      uniform float u_brightness;

      void main() {
        vec2 coord = gl_PointCoord - vec2(0.5);
        float dist = length(coord);
        if (dist > 0.5) {
          discard;
        }

        // Punto estelar suave con núcleo resplandeciente
        float alpha = smoothstep(0.5, 0.03, dist);
        float core = smoothstep(0.2, 0.0, dist) * 1.15;

        vec3 rgb = v_color.rgb * u_brightness * (1.0 + core);
        gl_FragColor = vec4(rgb, v_color.a * alpha);
      }
    `;

    const createShader = (type: number, source: string) => {
      const shader = gl.createShader(type);
      if (!shader) return null;
      gl.shaderSource(shader, source);
      gl.compileShader(shader);
      if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
        console.error('Shader compilation error:', gl.getShaderInfoLog(shader));
        gl.deleteShader(shader);
        return null;
      }
      return shader;
    };

    const vertexShader = createShader(gl.VERTEX_SHADER, vsSource);
    const fragmentShader = createShader(gl.FRAGMENT_SHADER, fsSource);
    if (!vertexShader || !fragmentShader) return;

    const program = gl.createProgram();
    if (!program) return;
    gl.attachShader(program, vertexShader);
    gl.attachShader(program, fragmentShader);
    gl.linkProgram(program);

    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
      console.error('Program link error:', gl.getProgramInfoLog(program));
      return;
    }
    gl.useProgram(program);

    const aPositionLoc = gl.getAttribLocation(program, 'a_position');
    const aColorLoc = gl.getAttribLocation(program, 'a_color');
    const aSizeLoc = gl.getAttribLocation(program, 'a_size');
    const aTypeLoc = gl.getAttribLocation(program, 'a_type');
    const aScatterLoc = gl.getAttribLocation(program, 'a_scatter');

    const uMvpLoc = gl.getUniformLocation(program, 'u_mvp');
    const uRevealLoc = gl.getUniformLocation(program, 'u_reveal');
    const uParticleSizeLoc = gl.getUniformLocation(program, 'u_particleSize');
    const uDepthLoc = gl.getUniformLocation(program, 'u_depth');
    const uTimeLoc = gl.getUniformLocation(program, 'u_time');
    const uSqueezeLoc = gl.getUniformLocation(program, 'u_squeeze');
    const uBrightnessLoc = gl.getUniformLocation(program, 'u_brightness');
    const uPullDisperseLoc = gl.getUniformLocation(program, 'u_pullDisperse');
    const uPullDirLoc = gl.getUniformLocation(program, 'u_pullDir');

    gl.enable(gl.BLEND);
    gl.blendFunc(gl.SRC_ALPHA, gl.ONE);
    gl.disable(gl.DEPTH_TEST);

    const posBuffer = gl.createBuffer();
    const colBuffer = gl.createBuffer();
    const sizeBuffer = gl.createBuffer();
    const typeBuffer = gl.createBuffer();
    const scatterBuffer = gl.createBuffer();

    let totalParticles = 0;
    let isDisposed = false;

    // --- CONSTRUCCIÓN DE PARTÍCULAS: ESFERA + ROSTRO NÍTIDO ---
    const buildParticles = (img: HTMLImageElement | null, useReactLogo: boolean) => {
      const positions: number[] = [];
      const colors: number[] = [];
      const sizes: number[] = [];
      const types: number[] = [];
      const scatters: number[] = [];

      // 1. ESFERA EXTERIOR DEL ORBE (Con halo y cúpula brillante superior como en la referencia)
      const sphereCount = 4400;
      const sphereRadius = 1.15;

      for (let i = 0; i < sphereCount; i++) {
        const y = 1 - (i / (sphereCount - 1)) * 2;
        const radiusAtY = Math.sqrt(1 - y * y);
        const phi = i * 2.399963229728653; // Ángulo áureo

        const r = sphereRadius * (0.97 + Math.random() * 0.05);
        const x = Math.cos(phi) * radiusAtY * r;
        const z = Math.sin(phi) * radiusAtY * r;
        const py = y * r;

        positions.push(x, py, z);

        // Paleta celestial: partículas superiores más concentradas y brillantes
        const isTopDome = y > 0.45;
        const rand = Math.random();

        if (isTopDome || rand > 0.72) {
          // Diamante estelar blanco puro
          colors.push(0.96, 0.98, 1.0, 0.95);
          sizes.push(0.025 + Math.random() * 0.018);
        } else if (rand > 0.28) {
          // Cian Eléctrico (#00d8ff)
          colors.push(0.0, 0.88, 1.0, 0.85);
          sizes.push(0.02 + Math.random() * 0.014);
        } else {
          // Azul Rey / Zafiro profundo
          colors.push(0.18, 0.45, 1.0, 0.7);
          sizes.push(0.016 + Math.random() * 0.01);
        }

        types.push(0.0);

        // Vector de dispersión para la esfera
        const ang = Math.random() * Math.PI * 2;
        scatters.push(Math.cos(ang) * 0.3, Math.sin(ang) * 0.3, (Math.random() - 0.5) * 0.3);
      }

      // 2. SUJETO INTERIOR: ROSTRO CON SU FORMA NORMAL Y FÍSICA DE DESHACER AL JALAR
      if (useReactLogo) {
        const logoTarget = settings.imageParticles;
        const nucleusCount = Math.floor(logoTarget * 0.18);
        const ringCount = Math.floor((logoTarget - nucleusCount) / 3);

        for (let i = 0; i < nucleusCount; i++) {
          const theta = Math.random() * Math.PI * 2;
          const rad = Math.sqrt(Math.random()) * 0.16;
          positions.push(Math.cos(theta) * rad, Math.sin(theta) * rad, (Math.random() - 0.5) * 0.1);
          colors.push(0.0, 0.92, 1.0, 0.95);
          sizes.push(0.02);
          types.push(1.0);

          const sang = Math.random() * Math.PI * 2;
          const spd = 0.8 + Math.random() * 1.2;
          scatters.push(Math.cos(sang) * spd, Math.sin(sang) * spd, (Math.random() - 0.5) * spd);
        }

        const angles = [0, Math.PI / 3, (2 * Math.PI) / 3];
        angles.forEach((orbitAngle) => {
          for (let i = 0; i < ringCount; i++) {
            const t = (i / ringCount) * Math.PI * 2;
            const ex = 0.58 * Math.cos(t);
            const ey = 0.22 * Math.sin(t);
            const ez = (Math.random() - 0.5) * 0.05;

            const cosO = Math.cos(orbitAngle);
            const sinO = Math.sin(orbitAngle);
            positions.push(ex * cosO - ey * sinO, ex * sinO + ey * cosO, ez);
            colors.push(0.0, 0.85, 1.0, 0.9);
            sizes.push(0.018);
            types.push(1.0);

            const sang = Math.random() * Math.PI * 2;
            const spd = 0.8 + Math.random() * 1.4;
            scatters.push(Math.cos(sang) * spd, Math.sin(sang) * spd, (Math.random() - 0.5) * spd);
          }
        });
      } else if (img) {
        // MUESTREO DEL RETRATO: CONSERVA LA FORMA NORMAL CON MÁXIMA DEFINICIÓN FACIAL
        const offCanvas = document.createElement('canvas');
        const offCtx = offCanvas.getContext('2d', { willReadFrequently: true });
        const sampleSize = 140;
        offCanvas.width = sampleSize;
        offCanvas.height = sampleSize;

        if (offCtx) {
          // Encuadre perfectamente cuadrado centrado en rostro, gafas y corbata
          const cropDim = Math.min(img.width * 0.74, img.height * 0.64);
          const cropX = (img.width - cropDim) * 0.5;
          const cropY = img.height * 0.06;

          offCtx.drawImage(img, cropX, cropY, cropDim, cropDim, 0, 0, sampleSize, sampleSize);
          const imgData = offCtx.getImageData(0, 0, sampleSize, sampleSize);
          const pixels = imgData.data;

          const targetCount = settings.imageParticles;
          const totalValidPixels = sampleSize * sampleSize;
          const sampleStep = Math.max(1, Math.floor(totalValidPixels / targetCount));

          const centerX = sampleSize / 2;
          const centerY = sampleSize * 0.44; // Foco en los ojos/gafas
          const maxRadius = sampleSize * 0.46;

          for (let py = 0; py < sampleSize; py++) {
            for (let px = 0; px < sampleSize; px++) {
              const dx = px - centerX;
              const dy = py - centerY;
              const dist = Math.sqrt(dx * dx + dy * dy);

              if (dist > maxRadius) continue;

              const idx = (py * sampleSize + px) * 4;
              const r = pixels[idx];
              const g = pixels[idx + 1];
              const b = pixels[idx + 2];
              const a = pixels[idx + 3] / 255;

              if (a < 0.1) continue;

              const edgeFade = 1.0 - Math.pow(dist / maxRadius, 2.5);

              if (Math.random() * sampleStep > 1.1) continue;

              // Coordenadas 3D de la forma normal
              const normX = (px / sampleSize - 0.5) * 1.25;
              const normY = -(py / sampleSize - 0.5) * 1.25;

              // Luminancia
              const rawLum = (r * 0.299 + g * 0.587 + b * 0.114) / 255;
              const lum = Math.max(0.0, Math.min(1.0, (rawLum - 0.1) / 0.82));

              // Detección de rasgos y bordes (ojos, montura de gafas, solapa)
              let isEdge = false;
              if (px > 0 && px < sampleSize - 1 && py > 0 && py < sampleSize - 1) {
                const rightIdx = (py * sampleSize + (px + 1)) * 4;
                const bottomIdx = ((py + 1) * sampleSize + px) * 4;
                const rightLum = (pixels[rightIdx] * 0.299 + pixels[rightIdx + 1] * 0.587 + pixels[rightIdx + 2] * 0.114) / 255;
                const bottomLum = (pixels[bottomIdx] * 0.299 + pixels[bottomIdx + 1] * 0.587 + pixels[bottomIdx + 2] * 0.114) / 255;
                if (Math.abs(rawLum - rightLum) + Math.abs(rawLum - bottomLum) > 0.13) {
                  isEdge = true;
                }
              }

              // Relieve 3D curvado en Z
              const sphereCurvature = Math.cos((dist / maxRadius) * (Math.PI / 2)) * 0.22;
              const normZ = (lum - 0.45) * 0.26 + sphereCurvature;

              positions.push(normX, normY, normZ);

              // Color Cian Holográfico de alto contraste
              const high = Math.pow(lum, 1.25);
              const colR = isEdge ? 0.48 : high * 0.4;
              const colG = 0.4 + high * 0.6;
              const colB = 0.9 + high * 0.1;
              const alpha = Math.min(1.0, (0.3 + lum * 0.7) * edgeFade);

              colors.push(colR, colG, colB, alpha);
              sizes.push(0.024 + (isEdge ? 0.012 : lum * 0.008));
              types.push(1.0);

              // --- GENERAR VECTOR DE DISPERSIÓN CAÓTICA ---
              // Cuando jalas, cada partícula tiene una trayectoria única hacia el exterior
              const ang = Math.atan2(normY, normX) + (Math.random() - 0.5) * 1.5;
              const speed = 0.8 + Math.random() * 1.8;
              const scatterZ = (Math.random() - 0.5) * 2.0;
              scatters.push(Math.cos(ang) * speed, Math.sin(ang) * speed, scatterZ);
            }
          }
        }
      }

      totalParticles = positions.length / 3;

      gl.bindBuffer(gl.ARRAY_BUFFER, posBuffer);
      gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(positions), gl.STATIC_DRAW);

      gl.bindBuffer(gl.ARRAY_BUFFER, colBuffer);
      gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(colors), gl.STATIC_DRAW);

      gl.bindBuffer(gl.ARRAY_BUFFER, sizeBuffer);
      gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(sizes), gl.STATIC_DRAW);

      gl.bindBuffer(gl.ARRAY_BUFFER, typeBuffer);
      gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(types), gl.STATIC_DRAW);

      gl.bindBuffer(gl.ARRAY_BUFFER, scatterBuffer);
      gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(scatters), gl.STATIC_DRAW);
    };

    if (settings.preset === 'react') {
      buildParticles(null, true);
    } else {
      const img = new Image();
      img.crossOrigin = 'anonymous';
      img.src = currentImageSrc;
      img.onload = () => {
        if (!isDisposed) buildParticles(img, false);
      };
      img.onerror = () => {
        if (!isDisposed) buildParticles(null, true);
      };
    }

    const projMatrix = new Float32Array(16);
    const viewMatrix = new Float32Array(16);
    const modelMatrix = new Float32Array(16);
    const rotXMatrix = new Float32Array(16);
    const rotYMatrix = new Float32Array(16);
    const rotZMatrix = new Float32Array(16);
    const tempMatrix1 = new Float32Array(16);
    const tempMatrix2 = new Float32Array(16);
    const mvpMatrix = new Float32Array(16);

    viewMatrix.fill(0);
    viewMatrix[0] = 1;
    viewMatrix[5] = 1;
    viewMatrix[10] = 1;
    viewMatrix[15] = 1;
    viewMatrix[14] = -3.1;

    // --- BUCLE DE FÍSICAS Y RENDER ---
    const render = () => {
      if (isDisposed) return;

      const p = physicsRef.current;
      const now = performance.now();
      const elapsedSec = (now - p.startTime) / 1000;

      // 1. Reveal
      if (p.revealProgress < 1.0) {
        const revealDuration = Math.max(0.1, settings.reveal);
        p.revealProgress = Math.min(1.0, elapsedSec / revealDuration);
      }

      // 2. FÍSICAS DE DESHACER LA CARA AL JALAR Y RECUPERACIÓN ELÁSTICA
      // Muelle amortiguado (Spring-Damper): atracción magnética de regreso a la forma normal
      const springK = 0.16; // Fuerza de atracción magnética de regreso
      const damping = 0.78; // Amortiguación fluida sin oscilación excesiva
      const disperseForce = (p.targetDisperse - p.pullDisperse) * springK;
      p.pullDisperseVel = (p.pullDisperseVel + disperseForce) * damping;
      p.pullDisperse += p.pullDisperseVel;

      if (!p.pointerDown && Math.abs(p.pullDisperse) < 0.001) {
        p.pullDisperse = 0.0;
        p.pullDisperseVel = 0.0;
      }

      // 3. FÍSICA DE ROTACIÓN: La cara se mantiene de frente (forma normal) con retorno elástico suave
      if (!p.pointerDown) {
        // Retorno suave a la orientación normal frontal
        p.targetRotX *= 0.92;
        p.targetRotY *= 0.92;
      }
      p.rotX += (p.targetRotX - p.rotX) * 0.15;
      p.rotY += (p.targetRotY - p.rotY) * 0.15;

      // 4. Squeeze elástico
      const targetSqueeze = p.pointerDown ? 0.86 : 1.0;
      const squeezeForce = (targetSqueeze - p.squeeze) * 0.16;
      p.squeezeVel = (p.squeezeVel + squeezeForce) * 0.74;
      p.squeeze += p.squeezeVel;

      // 5. Balanceo armónico cósmico (Sway)
      const swayPeriod = Math.max(2, settings.swayDuration);
      const swayPhase = (now / 1000 / swayPeriod) * Math.PI * 2;
      const swayRotY = Math.sin(swayPhase) * settings.sway * 0.45;
      const swayRotX = Math.cos(swayPhase * 0.8) * settings.sway * 0.25;
      const swayRotZ = Math.sin(swayPhase * 0.5) * settings.sway * 0.12;

      // 6. Inclinación Parallax por Hover
      const hoverTiltX = p.hoverY * 0.15;
      const hoverTiltY = p.hoverX * 0.18;

      const finalRotX = p.rotX + swayRotX + hoverTiltX;
      const finalRotY = p.rotY + swayRotY + hoverTiltY;
      const finalRotZ = swayRotZ;

      // Dimensionamiento del Canvas
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const targetW = canvas.clientWidth * dpr;
      const targetH = canvas.clientHeight * dpr;

      if (canvas.width !== targetW || canvas.height !== targetH) {
        canvas.width = targetW;
        canvas.height = targetH;
      }

      gl.viewport(0, 0, gl.drawingBufferWidth, gl.drawingBufferHeight);
      gl.clearColor(0.0, 0.0, 0.0, 0.0);
      gl.clear(gl.COLOR_BUFFER_BIT);

      if (totalParticles > 0) {
        gl.useProgram(program);

        const aspect = canvas.clientWidth / canvas.clientHeight;
        mat4Perspective(projMatrix, (45 * Math.PI) / 180, aspect, 0.1, 100.0);

        mat4FromRotationX(rotXMatrix, finalRotX);
        mat4FromRotationY(rotYMatrix, finalRotY);
        mat4FromRotationZ(rotZMatrix, finalRotZ);

        mat4Multiply(tempMatrix1, rotXMatrix, rotYMatrix);
        mat4Multiply(modelMatrix, rotZMatrix, tempMatrix1);

        mat4Multiply(tempMatrix2, viewMatrix, modelMatrix);
        mat4Multiply(mvpMatrix, projMatrix, tempMatrix2);

        gl.uniformMatrix4fv(uMvpLoc, false, mvpMatrix);
        gl.uniform1f(uRevealLoc, p.revealProgress);
        gl.uniform1f(uParticleSizeLoc, settings.particleSize);
        gl.uniform1f(uDepthLoc, settings.depth);
        gl.uniform1f(uTimeLoc, now * 0.001);
        gl.uniform1f(uBrightnessLoc, settings.brightness);

        // Uniformes de dispersión al jalar
        gl.uniform1f(uPullDisperseLoc, p.pullDisperse);
        gl.uniform2f(uPullDirLoc, p.pullDirX, p.pullDirY);

        // Squeeze
        const sqY = p.squeeze;
        const sqXZ = 1.0 + (1.0 - sqY) * 0.42;
        gl.uniform3f(uSqueezeLoc, sqXZ, sqY, sqXZ);

        // Atributos de GPU
        gl.enableVertexAttribArray(aPositionLoc);
        gl.bindBuffer(gl.ARRAY_BUFFER, posBuffer);
        gl.vertexAttribPointer(aPositionLoc, 3, gl.FLOAT, false, 0, 0);

        gl.enableVertexAttribArray(aColorLoc);
        gl.bindBuffer(gl.ARRAY_BUFFER, colBuffer);
        gl.vertexAttribPointer(aColorLoc, 4, gl.FLOAT, false, 0, 0);

        gl.enableVertexAttribArray(aSizeLoc);
        gl.bindBuffer(gl.ARRAY_BUFFER, sizeBuffer);
        gl.vertexAttribPointer(aSizeLoc, 1, gl.FLOAT, false, 0, 0);

        gl.enableVertexAttribArray(aTypeLoc);
        gl.bindBuffer(gl.ARRAY_BUFFER, typeBuffer);
        gl.vertexAttribPointer(aTypeLoc, 1, gl.FLOAT, false, 0, 0);

        gl.enableVertexAttribArray(aScatterLoc);
        gl.bindBuffer(gl.ARRAY_BUFFER, scatterBuffer);
        gl.vertexAttribPointer(aScatterLoc, 3, gl.FLOAT, false, 0, 0);

        gl.drawArrays(gl.POINTS, 0, totalParticles);
      }

      animFrameRef.current = requestAnimationFrame(render);
    };

    render();

    return () => {
      isDisposed = true;
      cancelAnimationFrame(animFrameRef.current);
      gl.deleteProgram(program);
      gl.deleteShader(vertexShader);
      gl.deleteShader(fragmentShader);
      gl.deleteBuffer(posBuffer);
      gl.deleteBuffer(colBuffer);
      gl.deleteBuffer(sizeBuffer);
      gl.deleteBuffer(typeBuffer);
      gl.deleteBuffer(scatterBuffer);
    };
  }, [currentImageSrc, settings.imageParticles, settings.colorMode, settings.preset, revealKey]);

  // --- CONTROLADORES POINTER: JALAR Y DESHACER LA CARA ---
  const handlePointerDown = (e: React.PointerEvent<HTMLCanvasElement>) => {
    e.currentTarget.setPointerCapture(e.pointerId);
    const p = physicsRef.current;
    p.pointerDown = true;
    p.startPointerX = e.clientX;
    p.startPointerY = e.clientY;
    p.currentPointerX = e.clientX;
    p.currentPointerY = e.clientY;
    p.targetDisperse = 0.35; // Inicio sutil de la tensión al hacer clic
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLCanvasElement>) => {
    const p = physicsRef.current;
    const rect = e.currentTarget.getBoundingClientRect();

    const normX = ((e.clientX - rect.left) / rect.width) * 2 - 1;
    const normY = ((e.clientY - rect.top) / rect.height) * 2 - 1;
    p.hoverX = normX;
    p.hoverY = normY;

    if (p.pointerDown) {
      p.currentPointerX = e.clientX;
      p.currentPointerY = e.clientY;

      const deltaX = e.clientX - p.startPointerX;
      const deltaY = e.clientY - p.startPointerY;
      const pullDist = Math.hypot(deltaX, deltaY);

      if (pullDist > 2.0) {
        // Dirección normalizada del tirón
        p.pullDirX = deltaX / pullDist;
        p.pullDirY = deltaY / pullDist;

        // Cuanto más lo jalas, más se deshace la cara
        p.targetDisperse = Math.min(1.85, (pullDist / 85.0) * 1.15 + 0.3);

        // Inclinación elástica leve hacia el tirón
        p.targetRotY = (deltaX / rect.width) * 0.45;
        p.targetRotX = (deltaY / rect.height) * 0.45;
      }
    }
  };

  const handlePointerUp = (e: React.PointerEvent<HTMLCanvasElement>) => {
    try {
      e.currentTarget.releasePointerCapture(e.pointerId);
    } catch {
      // Ignorar
    }
    const p = physicsRef.current;
    p.pointerDown = false;
    // AL SOLTAR: VUELVE Y RECUPERA SU ESTADO NORMAL INMEDIATAMENTE
    p.targetDisperse = 0.0;
  };

  const handlePointerLeave = () => {
    const p = physicsRef.current;
    p.hoverX = 0;
    p.hoverY = 0;
  };

  return (
    <div
      ref={containerRef}
      className={`particle-orb-wrapper ${className}`}
      style={{
        position: 'relative',
        width: '100%',
        maxWidth: '820px',
        height: `${size}px`,
        margin: '0 auto',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        userSelect: 'none',
      }}
    >
      {/* Resplandor ambiental de fondo */}
      <div
        style={{
          position: 'absolute',
          width: '440px',
          height: '440px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(0, 216, 255, 0.22) 0%, rgba(37, 99, 235, 0.09) 45%, transparent 70%)',
          filter: 'blur(50px)',
          pointerEvents: 'none',
          zIndex: 0,
        }}
      />

      {/* Canvas WebGL Interactivo */}
      <canvas
        ref={canvasRef}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerCancel={handlePointerUp}
        onPointerLeave={handlePointerLeave}
        style={{
          width: '100%',
          height: '100%',
          maxWidth: `${size}px`,
          maxHeight: `${size}px`,
          display: 'block',
          cursor: physicsRef.current.pointerDown ? 'grabbing' : 'grab',
          touchAction: 'none',
          position: 'relative',
          zIndex: 1,
        }}
      />
    </div>
  );
};
