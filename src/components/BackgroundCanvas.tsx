import React, { useEffect, useRef, useState } from 'react';

export default function BackgroundCanvas() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const mouseRef = useRef({ x: 0, y: 0 });
  const [smoothMouse, setSmoothMouse] = useState({ x: 0, y: 0 });
  const [fallbackMode, setFallbackMode] = useState(false);

  // Parallax tracker for non-frequently-updating React items like the celestial sphere
  useEffect(() => {
    let animationId: number;
    const handleMouseMove = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth) * 2 - 1;
      const y = (e.clientY / window.innerHeight) * 2 - 1;
      mouseRef.current = { x, y };
    };

    const updateSmoothMouse = () => {
      setSmoothMouse((prev) => {
        const dx = mouseRef.current.x - prev.x;
        const dy = mouseRef.current.y - prev.y;
        return {
          x: prev.x + dx * 0.05,
          y: prev.y + dy * 0.05,
        };
      });
      animationId = requestAnimationFrame(updateSmoothMouse);
    };

    window.addEventListener('mousemove', handleMouseMove);
    animationId = requestAnimationFrame(updateSmoothMouse);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animationId);
    };
  }, []);

  // WebGL Fluid Shader Logic
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const gl = canvas.getContext('webgl', { alpha: false, antialias: true }) || 
               canvas.getContext('experimental-webgl', { alpha: false, antialias: true });

    if (!gl) {
      console.warn('WebGL not supported, enabling CSS gradient fallback');
      setFallbackMode(true);
      return;
    }

    // Vertex Shader: Maps normalized coordinates to cover the entire viewport
    const vsSource = `
      attribute vec2 aPosition;
      varying vec2 vUv;
      void main() {
        vUv = aPosition * 0.5 + 0.5;
        gl_Position = vec4(aPosition, 0.0, 1.0);
      }
    `;

    // Fragment Shader: High-density domain-warping fluid mathematics
    // Recreates the exact palette combinations (black, tactical olive green, sage, warm amber, glowing golds)
    const fsSource = `
      precision highp float;
      varying vec2 vUv;
      uniform vec2 uResolution;
      uniform float uTime;
      uniform vec2 uMouse;

      // Mathematical flow octave generator simulating fluid silk / Perlin domain-warping
      float flowField(vec2 p, float time) {
        float value = 0.0;
        float scale = 1.15;
        for (int i = 0; i < 5; i++) {
          float t = time * (0.2 + 0.06 * float(i));
          // Warp coordinates inside the loop
          p += vec2(
            sin(p.y * scale + t + float(i) * 1.5 + uMouse.x * 0.18),
            cos(p.x * scale + t - float(i) * 2.1 + uMouse.y * 0.18)
          ) * 0.38;
          value += sin(p.x * scale) * cos(p.y * scale) * (0.58 / scale);
          scale *= 1.32;
        }
        return value;
      }

      void main() {
        // Center-normalized aspect-corrected coordinate spacing
        vec2 p = (gl_FragCoord.xy * 2.0 - uResolution) / min(uResolution.x, uResolution.y);
        
        // Calculate the fluid height using slow rotation coordinates
        float f = flowField(p * 0.72, uTime * 0.18);
        
        // Normalize fluid value into [0..1] range, skewed slightly to emphasize dark nodes
        float density = clamp(f * 1.35 + 0.35, 0.0, 1.0);
        
        // Apply power calculation to enforce deep rich black areas taking major real estate
        float shapedDensity = pow(density, 2.75);
        
        // Paleta Hatarisum: azul noche profundo -> terracota -> dorado
        vec3 colBlack  = vec3(0.039, 0.075, 0.133); // Azul noche profundo #0A1322
        vec3 colOlive1 = vec3(0.102, 0.169, 0.290); // Azul noche andino #1A2B4A
        vec3 colOlive2 = vec3(0.353, 0.165, 0.149); // Transición azul->terracota
        vec3 colSage   = vec3(0.541, 0.200, 0.125); // Terracota oscuro #8A3320
        vec3 colAmber  = vec3(0.722, 0.267, 0.165); // Terracota base #B8442A
        vec3 colGold1  = vec3(0.831, 0.349, 0.227); // Terracota claro #D4593A
        vec3 colGold2  = vec3(0.831, 0.635, 0.298); // Dorado ascenso #D4A24C

        vec3 finalColor = colBlack;
        
        // Custom segmented interpolator to construct complex seamless liquid patterns
        if (shapedDensity < 0.15) {
          // Inner core dark black transitioning to military olive
          finalColor = mix(colBlack, colOlive1, shapedDensity / 0.15);
        } else if (shapedDensity < 0.38) {
          // Transitioning from olive to medium sage-green
          finalColor = mix(colOlive1, colOlive2, (shapedDensity - 0.15) / 0.23);
        } else if (shapedDensity < 0.62) {
          // Sage merging into golden amber curves
          finalColor = mix(colOlive2, colSage, (shapedDensity - 0.38) / 0.24);
        } else if (shapedDensity < 0.85) {
          // Amber merging into warm golden waves
          finalColor = mix(colSage, colAmber, (shapedDensity - 0.62) / 0.23);
        } else {
          // Gorgeous high peak golden-brass highlights
          finalColor = mix(colAmber, colGold2, (shapedDensity - 0.85) / 0.15);
        }

        // Tactile grain/dithering to avoid visual banding (banding)
        float dither = fract(sin(dot(gl_FragCoord.xy, vec2(12.9898, 78.233))) * 43758.5453) * 0.015;
        finalColor += (dither - 0.0075);

        // Vignette effect to keep the borders dark and elegant
        vec2 uv = gl_FragCoord.xy / uResolution;
        float vignette = uv.x * uv.y * (1.0 - uv.x) * (1.0 - uv.y);
        vignette = clamp(pow(16.0 * vignette, 0.3), 0.0, 1.0);
        finalColor *= mix(0.7, 1.0, vignette);

        gl_FragColor = vec4(finalColor, 1.0);
      }
    `;

    function compileShader(source: string, type: number): WebGLShader | null {
      const shader = gl.createShader(type);
      if (!shader) return null;
      gl.shaderSource(shader, source);
      gl.compileShader(shader);
      if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
        console.error('Shader compiler error log:', gl.getShaderInfoLog(shader));
        gl.deleteShader(shader);
        return null;
      }
      return shader;
    }

    const vertexShader = compileShader(vsSource, gl.VERTEX_SHADER);
    const fragmentShader = compileShader(fsSource, gl.FRAGMENT_SHADER);

    if (!vertexShader || !fragmentShader) {
      setFallbackMode(true);
      return;
    }

    const program = gl.createProgram();
    if (!program) {
      setFallbackMode(true);
      return;
    }

    gl.attachShader(program, vertexShader);
    gl.attachShader(program, fragmentShader);
    gl.linkProgram(program);

    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
      console.error('Program link error logo:', gl.getProgramInfoLog(program));
      setFallbackMode(true);
      return;
    }

    gl.useProgram(program);

    // Coordinate data for full display quad
    const vertices = new Float32Array([
      -1, -1,
       1, -1,
      -1,  1,
      -1,  1,
       1, -1,
       1,  1,
    ]);

    const vertexBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.STATIC_DRAW);

    const positionAttribute = gl.getAttribLocation(program, 'aPosition');
    gl.enableVertexAttribArray(positionAttribute);
    gl.vertexAttribPointer(positionAttribute, 2, gl.FLOAT, false, 0, 0);

    // Bind uniforms
    const uResolutionLoc = gl.getUniformLocation(program, 'uResolution');
    const uTimeLoc = gl.getUniformLocation(program, 'uTime');
    const uMouseLoc = gl.getUniformLocation(program, 'uMouse');

    let animationId: number;
    const startTimeStamp = Date.now();

    const handleResize = () => {
      if (!canvas) return;
      const width = window.innerWidth;
      const height = window.innerHeight;
      canvas.width = width * Math.min(window.devicePixelRatio, 2);
      canvas.height = height * Math.min(window.devicePixelRatio, 2);
      gl.viewport(0, 0, canvas.width, canvas.height);
    };

    window.addEventListener('resize', handleResize);
    handleResize();

    let interpolatedMouseX = 0;
    let interpolatedMouseY = 0;

    const renderLoop = () => {
      const timeSecs = (Date.now() - startTimeStamp) * 0.001;

      // Smooth mouse coordinates scaling passed down as Uniform values
      interpolatedMouseX += (mouseRef.current.x - interpolatedMouseX) * 0.06;
      interpolatedMouseY += (mouseRef.current.y - interpolatedMouseY) * 0.06;

      gl.useProgram(program);
      gl.uniform2f(uResolutionLoc, canvas.width, canvas.height);
      gl.uniform1f(uTimeLoc, timeSecs);
      gl.uniform2f(uMouseLoc, interpolatedMouseX, interpolatedMouseY);

      gl.drawArrays(gl.TRIANGLES, 0, 6);
      animationId = requestAnimationFrame(renderLoop);
    };

    animationId = requestAnimationFrame(renderLoop);

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener('resize', handleResize);
      if (gl) {
        gl.deleteBuffer(vertexBuffer);
        gl.deleteProgram(program);
        gl.deleteShader(vertexShader);
        gl.deleteShader(fragmentShader);
      }
    };
  }, [fallbackMode]);

  return (
    <div 
      id="flow-canvas-wrapper"
      className="fixed inset-0 -z-50 overflow-hidden bg-black select-none pointer-events-none"
    >
      {/* 1. High-Performance WebGL Fluid Core */}
      {!fallbackMode ? (
        <canvas 
          ref={canvasRef}
          id="webgl-fluid-canvas"
          className="absolute inset-0 w-full h-full block"
        />
      ) : (
        /* Fallback CSS animated ambient mesh gradient simulating Perlin noise */
        <div id="css-fallback-aurora" className="absolute inset-0 bg-[#0A1322] overflow-hidden">
          <div className="absolute top-[-10%] left-[-10%] w-[80vw] h-[80vw] rounded-full bg-[#1A2B4A]/40 blur-[120px] animate-[pulse_12s_ease-in-out_infinite]" />
          <div className="absolute bottom-[-15%] right-[-10%] w-[90vw] h-[90vw] rounded-full bg-[#8A3320]/25 blur-[130px] animate-[pulse_16s_ease-in-out_infinite]" />
          <div className="absolute top-[30%] right-[10%] w-[60vw] h-[60vw] rounded-full bg-[#B8442A]/20 blur-[100px] animate-[pulse_10s_ease-in-out_infinite]" />
          <div className="absolute bottom-[10%] left-[20%] w-[70vw] h-[70vw] rounded-full bg-[#D4A24C]/15 blur-[110px] animate-[pulse_14s_ease-in-out_infinite]" />
        </div>
      )}

      {/* 2. THE GRAND CELESTIAL GLOBE: Semi-transparent, backdrop-blurred planet at top-right with warm gold ambient bottom rim */}
      <div 
        id="aurora-celestial-sphere"
        className="absolute top-[4%] right-[-12%] w-[65vw] h-[65vw] min-w-[360px] min-h-[360px] max-w-[900px] rounded-full pointer-events-none select-none z-10 transition-transform duration-700 ease-out"
        style={{
          transform: `translate(${smoothMouse.x * -25}px, ${smoothMouse.y * -25}px)`,
        }}
      >
        {/* Dark core backdropped layer allowing fluid aurora waves under-illumination to bleed organically */}
        <div className="absolute inset-0 rounded-full bg-[#070E1A]/70 border border-white/[0.01]" />
        
        {/* Backdrop blur to distort background details */}
        <div className="absolute inset-[1px] rounded-full backdrop-blur-[6px]" />

        {/* Bottom crescent edge illuminated with glowing dim-gold shadows */}
        <div className="absolute inset-0 rounded-full shadow-[inset_0px_-24px_50px_rgba(212,162,76,0.20),_inset_0px_2px_12px_rgba(255,255,255,0.02)]" />

        {/* Ambient atmospheric warm bronze base bloom */}
        <div className="absolute -inset-12 rounded-full bg-[#D4A24C]/[0.03] filter blur-[60px]" />
      </div>

      {/* 3. Global tactile analog noise overlay - prevents display color-banding completely */}
      <div 
        id="analog-grain-stencil"
        className="absolute inset-0 pointer-events-none opacity-[0.065] mix-blend-overlay"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 250 250' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
        }}
      />
    </div>
  );
}
