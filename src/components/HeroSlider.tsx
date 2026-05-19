import React, { useEffect, useRef, useMemo } from "react";
import * as THREE from "three";
import gsap from "gsap";

const fragmentShader = `
uniform float time;
uniform float progress;
uniform float width;
uniform float scaleX;
uniform float scaleY;
uniform sampler2D texture1;
uniform sampler2D texture2;
uniform sampler2D displacement;
uniform vec4 resolution;

varying vec2 vUv;
varying vec4 vPosition;

vec4 permute(vec4 x){return mod(((x*34.0)+1.0)*x, 289.0);}
vec4 taylorInvSqrt(vec4 r){return 1.79284291400159 - 0.85373472095314 * r;}
vec4 fade(vec4 t) {return t*t*t*(t*(t*6.0-15.0)+10.0);}

float cnoise(vec4 P){
  vec4 Pi0 = floor(P);
  vec4 Pi1 = Pi0 + 1.0;
  Pi0 = mod(Pi0, 289.0);
  Pi1 = mod(Pi1, 289.0);
  vec4 Pf0 = fract(P);
  vec4 Pf1 = Pf0 - 1.0;
  vec4 ix = vec4(Pi0.x, Pi1.x, Pi0.x, Pi1.x);
  vec4 iy = vec4(Pi0.yy, Pi1.yy);
  vec4 iz0 = vec4(Pi0.zzzz);
  vec4 iz1 = vec4(Pi1.zzzz);
  vec4 iw0 = vec4(Pi0.wwww);
  vec4 iw1 = vec4(Pi1.wwww);

  vec4 ixy = permute(permute(ix) + iy);
  vec4 ixy0 = permute(ixy + iz0);
  vec4 ixy1 = permute(ixy + iz1);
  vec4 ixy00 = permute(ixy0 + iw0);
  vec4 ixy01 = permute(ixy0 + iw1);
  vec4 ixy10 = permute(ixy1 + iw0);
  vec4 ixy11 = permute(ixy1 + iw1);

  vec4 gx00 = ixy00 / 7.0;
  vec4 gy00 = floor(gx00) / 7.0;
  vec4 gz00 = floor(gy00) / 6.0;
  gx00 = fract(gx00) - 0.5;
  gy00 = fract(gy00) - 0.5;
  gz00 = fract(gz00) - 0.5;
  vec4 gw00 = vec4(0.75) - abs(gx00) - abs(gy00) - abs(gz00);
  vec4 sw00 = step(gw00, vec4(0.0));
  gx00 -= sw00 * (step(0.0, gx00) - 0.5);
  gy00 -= sw00 * (step(0.0, gy00) - 0.5);

  vec4 gx01 = ixy01 / 7.0;
  vec4 gy01 = floor(gx01) / 7.0;
  vec4 gz01 = floor(gy01) / 6.0;
  gx01 = fract(gx01) - 0.5;
  gy01 = fract(gy01) - 0.5;
  gz01 = fract(gz01) - 0.5;
  vec4 gw01 = vec4(0.75) - abs(gx01) - abs(gy01) - abs(gz01);
  vec4 sw01 = step(gw01, vec4(0.0));
  gx01 -= sw01 * (step(0.0, gx01) - 0.5);
  gy01 -= sw01 * (step(0.0, gy01) - 0.5);

  vec4 gx10 = ixy10 / 7.0;
  vec4 gy10 = floor(gx10) / 7.0;
  vec4 gz10 = floor(gy10) / 6.0;
  gx10 = fract(gx10) - 0.5;
  gy10 = fract(gy10) - 0.5;
  gz10 = fract(gz10) - 0.5;
  vec4 gw10 = vec4(0.75) - abs(gx10) - abs(gy10) - abs(gz10);
  vec4 sw10 = step(gw10, vec4(0.0));
  gx10 -= sw10 * (step(0.0, gx10) - 0.5);
  gy10 -= sw10 * (step(0.0, gy10) - 0.5);

  vec4 gx11 = ixy11 / 7.0;
  vec4 gy11 = floor(gx11) / 7.0;
  vec4 gz11 = floor(gy11) / 6.0;
  gx11 = fract(gx11) - 0.5;
  gy11 = fract(gy11) - 0.5;
  gz11 = fract(gz11) - 0.5;
  vec4 gw11 = vec4(0.75) - abs(gx11) - abs(gy11) - abs(gz11);
  vec4 sw11 = step(gw11, vec4(0.0));
  gx11 -= sw11 * (step(0.0, gx11) - 0.5);
  gy11 -= sw11 * (step(0.0, gy11) - 0.5);

  vec4 g0000 = vec4(gx00.x,gy00.x,gz00.x,gw00.x);
  vec4 g1000 = vec4(gx00.y,gy00.y,gz00.y,gw00.y);
  vec4 g0100 = vec4(gx00.z,gy00.z,gz00.z,gw00.z);
  vec4 g1100 = vec4(gx00.w,gy00.w,gz00.w,gw00.w);
  vec4 g0010 = vec4(gx10.x,gy10.x,gz10.x,gw10.x);
  vec4 g1010 = vec4(gx10.y,gy10.y,gz10.y,gw10.y);
  vec4 g0110 = vec4(gx10.z,gy10.z,gz10.z,gw10.z);
  vec4 g1110 = vec4(gx10.w,gy10.w,gz10.w,gw10.w);
  vec4 g0001 = vec4(gx01.x,gy01.x,gz01.x,gw01.x);
  vec4 g1001 = vec4(gx01.y,gy01.y,gz01.y,gw01.y);
  vec4 g0101 = vec4(gx01.z,gy01.z,gz01.z,gw01.z);
  vec4 g1101 = vec4(gx01.w,gy01.w,gz01.w,gw01.w);
  vec4 g0011 = vec4(gx11.x,gy11.x,gz11.x,gw11.x);
  vec4 g1011 = vec4(gx11.y,gy11.y,gz11.y,gw11.y);
  vec4 g0111 = vec4(gx11.z,gy11.z,gz11.z,gw11.z);
  vec4 g1111 = vec4(gx11.w,gy11.w,gz11.w,gw11.w);

  vec4 norm00 = taylorInvSqrt(vec4(dot(g0000, g0000), dot(g0100, g0100), dot(g1000, g1000), dot(g1100, g1100)));
  g0000 *= norm00.x;
  g0100 *= norm00.y;
  g1000 *= norm00.z;
  g1100 *= norm00.w;

  vec4 norm01 = taylorInvSqrt(vec4(dot(g0001, g0001), dot(g0101, g0101), dot(g1001, g1001), dot(g1101, g1101)));
  g0001 *= norm01.x;
  g0101 *= norm01.y;
  g1001 *= norm01.z;
  g1101 *= norm01.w;

  vec4 norm10 = taylorInvSqrt(vec4(dot(g0010, g0010), dot(g0110, g0110), dot(g1010, g1010), dot(g1110, g1110)));
  g0010 *= norm10.x;
  g0110 *= norm10.y;
  g1010 *= norm10.z;
  g1110 *= norm10.w;

  vec4 norm11 = taylorInvSqrt(vec4(dot(g0011, g0011), dot(g0111, g0111), dot(g1011, g1011), dot(g1111, g1111)));
  g0011 *= norm11.x;
  g0111 *= norm11.y;
  g1011 *= norm11.z;
  g1111 *= norm11.w;

  float n0000 = dot(g0000, Pf0);
  float n1000 = dot(g1000, vec4(Pf1.x, Pf0.yzw));
  float n0100 = dot(g0100, vec4(Pf0.x, Pf1.y, Pf0.zw));
  float n1100 = dot(g1100, vec4(Pf1.xy, Pf0.zw));
  float n0010 = dot(g0010, vec4(Pf0.xy, Pf1.z, Pf0.w));
  float n1010 = dot(g1010, vec4(Pf1.x, Pf0.y, Pf1.z, Pf0.w));
  float n0110 = dot(g0110, vec4(Pf0.x, Pf1.yz, Pf0.w));
  float n1110 = dot(g1110, vec4(Pf1.xyz, Pf0.w));
  float n0001 = dot(g0001, vec4(Pf0.xyz, Pf1.w));
  float n1001 = dot(g1001, vec4(Pf1.x, Pf0.yz, Pf1.w));
  float n0101 = dot(g0101, vec4(Pf0.x, Pf1.y, Pf0.z, Pf1.w));
  float n1101 = dot(g1101, vec4(Pf1.xy, Pf0.z, Pf1.w));
  float n0011 = dot(g0011, vec4(Pf0.xy, Pf1.zw));
  float n1011 = dot(g1011, vec4(Pf1.x, Pf0.y, Pf1.zw));
  float n0111 = dot(g0111, vec4(Pf0.x, Pf1.yzw));
  float n1111 = dot(g1111, Pf1);

  vec4 fade_xyzw = fade(Pf0);
  vec4 n_0w = mix(vec4(n0000, n1000, n0100, n1100), vec4(n0001, n1001, n0101, n1101), fade_xyzw.w);
  vec4 n_1w = mix(vec4(n0010, n1010, n0110, n1110), vec4(n0011, n1011, n0111, n1111), fade_xyzw.w);
  vec4 n_zw = mix(n_0w, n_1w, fade_xyzw.z);
  vec2 n_yzw = mix(n_zw.xy, n_zw.zw, fade_xyzw.y);
  float n_xyzw = mix(n_yzw.x, n_yzw.y, fade_xyzw.x);
  return 2.2 * n_xyzw;
}

float parabola( float x, float k ) {
  return pow( 4. * x * ( 1. - x ), k );
}

void main() {
  float dt = parabola(progress,1.);
  float border = 1.;
  vec2 newUV = (vUv - vec2(0.5))*resolution.zw + vec2(0.5);
  vec4 color1 = texture2D(texture1,newUV);
  vec4 color2 = texture2D(texture2,newUV);
  vec4 d = texture2D(displacement,vec2(newUV.x*scaleX,newUV.y*scaleY));

  float realnoise = 0.5*(cnoise(vec4(newUV.x*scaleX  + 0.*time/3., newUV.y*scaleY,0.*time/3.,0.)) +1.);
  float w = width*dt;
  float maskvalue = smoothstep(1. - w,1.,vUv.x + mix(-w/2., 1. - w/2., progress));
  float maskvalue0 = smoothstep(1.,1.,vUv.x + progress);
  float mask = maskvalue + maskvalue*realnoise;
  float final = smoothstep(border,border+0.01,mask);

  gl_FragColor = mix(color1,color2,final);
}
`;

const vertexShader = `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

interface SlideItem {
  id: number;
  type: "image" | "video";
  src: string;
}

interface HeroSliderProps {
  currentIndex: number;
  items: SlideItem[];
  paused?: boolean;
  onTransitionStart?: () => void;
  onTransitionEnd?: () => void;
}

export default function HeroSlider({ currentIndex, items, paused = false, onTransitionStart, onTransitionEnd }: HeroSliderProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const materialsRef = useRef<THREE.ShaderMaterial | null>(null);
  const texturesRef = useRef<Record<string, THREE.Texture>>({});
  const lastIndexRef = useRef(currentIndex);
  const isRunningRef = useRef(false);
  const pausedRef = useRef(paused);

  useEffect(() => {
    if (!containerRef.current) return;

    let destroyed = false;
    const container = containerRef.current;
    
    const scene = new THREE.Scene();
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setPixelRatio(window.devicePixelRatio);
    let width = container.offsetWidth;
    let height = container.offsetHeight;
    renderer.setSize(width, height);
    renderer.setClearColor(0x0c0c0c, 1);
    
    container.appendChild(renderer.domElement);

    const camera = new THREE.PerspectiveCamera(70, width / height, 0.001, 1000);
    camera.position.set(0, 0, 2);

    let time = 0;
    const loader = new THREE.TextureLoader();
    let animationFrameId: number;

    const uniforms = {
      time: { type: "f", value: 0 },
      progress: { type: "f", value: 0 },
      width: { type: "f", value: 10.0 },
      scaleX: { type: "f", value: 40.0 },
      scaleY: { type: "f", value: 40.0 },
      texture1: { type: "t", value: null as THREE.Texture | null },
      texture2: { type: "t", value: null as THREE.Texture | null },
      displacement: { type: "t", value: loader.load("/img/disp1.jpg") },
      resolution: { type: "v4", value: new THREE.Vector4() },
    };

    const material = new THREE.ShaderMaterial({
      side: THREE.DoubleSide,
      uniforms,
      vertexShader,
      fragmentShader,
    });
    materialsRef.current = material;

    const geometry = new THREE.PlaneGeometry(1, 1, 2, 2);
    const plane = new THREE.Mesh(geometry, material);
    scene.add(plane);

    const resize = () => {
      if (destroyed || pausedRef.current) return;
      width = container.offsetWidth;
      height = container.offsetHeight;
      if (width === 0 || height === 0) return;
      renderer.setSize(width, height);
      camera.aspect = width / height;

      const currentTex = material.uniforms.texture1.value;
      if (currentTex && currentTex.image) {
        const imageAspect = (currentTex.image.height || currentTex.image.videoHeight) / (currentTex.image.width || currentTex.image.videoWidth);
        let a1, a2;
        if (height / width > imageAspect) {
          a1 = (width / height) * imageAspect;
          a2 = 1;
        } else {
          a1 = 1;
          a2 = (height / width) / imageAspect;
        }
        material.uniforms.resolution.value.set(width, height, a1, a2);
      }

      const dist = camera.position.z;
      const fovHeight = 1;
      camera.fov = 2 * (180 / Math.PI) * Math.atan(fovHeight / (2 * dist));
      plane.scale.x = camera.aspect;
      plane.scale.y = 1;
      camera.updateProjectionMatrix();
    };

    window.addEventListener("resize", resize);

    const loadTexture = (item: SlideItem): Promise<THREE.Texture> => {
      if (texturesRef.current[item.src]) return Promise.resolve(texturesRef.current[item.src]);
      
      return new Promise((resolve) => {
        if (item.type === "video") {
          const video = document.createElement("video");
          video.src = item.src;
          video.loop = true;
          video.muted = true;
          video.defaultMuted = true;
          video.playsInline = true;
          video.crossOrigin = "anonymous";
          video.autoplay = true;
          
          const onVideoReady = () => {
            video.play().catch(e => console.warn('Video play error:', e));
            const tex = new THREE.VideoTexture(video);
            texturesRef.current[item.src] = tex;
            resolve(tex);
          };

          if (video.readyState >= 3) {
            onVideoReady();
          } else {
            video.oncanplay = onVideoReady;
            // Also try onloadeddata as a fallback
            video.onloadeddata = () => {
              if (video.readyState >= 3) onVideoReady();
            };
          }
          video.load();
        } else {
          loader.load(item.src, (tex) => {
            texturesRef.current[item.src] = tex;
            resolve(tex);
          });
        }
      });
    };

    // Preload current and next
    loadTexture(items[currentIndex]).then((tex) => {
      if (destroyed) return;
      material.uniforms.texture1.value = tex;
      resize();
    });

    const render = () => {
      if (destroyed) return;
      animationFrameId = requestAnimationFrame(render);
      if (pausedRef.current) return; // skip rendering when footer is active
      time += 0.05;
      material.uniforms.time.value = time;
      renderer.render(scene, camera);
    };
    render();

    return () => {
      destroyed = true;
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("resize", resize);
      container.removeChild(renderer.domElement);
      renderer.dispose();
      material.dispose();
      geometry.dispose();
      // Dispose textures
      Object.values(texturesRef.current).forEach((t: any) => t.dispose());
    };
  }, [items]);

  // Sync paused prop to ref so the render loop can read it without stale closure
  useEffect(() => {
    pausedRef.current = paused;
  }, [paused]);

  useEffect(() => {
    if (currentIndex === lastIndexRef.current || !materialsRef.current || isRunningRef.current) return;

    // Skip if paused (footer slide)
    if (pausedRef.current) {
      lastIndexRef.current = currentIndex;
      onTransitionEnd?.();
      return;
    }

    const material = materialsRef.current;
    isRunningRef.current = true;
    onTransitionStart?.();

    const loadTexture = (item: SlideItem): Promise<THREE.Texture> => {
      if (texturesRef.current[item.src]) return Promise.resolve(texturesRef.current[item.src]);
      const loader = new THREE.TextureLoader();
      return new Promise((resolve) => {
        if (item.type === "video") {
          const video = document.createElement("video");
          video.src = item.src;
          video.loop = true;
          video.muted = true;
          video.defaultMuted = true;
          video.playsInline = true;
          video.crossOrigin = "anonymous";
          video.autoplay = true;
          
          const onVideoReady = () => {
            video.play().catch(e => console.warn('Video play error:', e));
            const tex = new THREE.VideoTexture(video);
            texturesRef.current[item.src] = tex;
            resolve(tex);
          };

          if (video.readyState >= 3) {
            onVideoReady();
          } else {
            video.oncanplay = onVideoReady;
            video.onloadeddata = () => {
              if (video.readyState >= 3) onVideoReady();
            };
          }
          video.load();
        } else {
          loader.load(item.src, (tex) => {
            texturesRef.current[item.src] = tex;
            resolve(tex);
          });
        }
      });
    };

    loadTexture(items[currentIndex]).then((nextTexture) => {
      material.uniforms.texture2.value = nextTexture;
      
      gsap.to(material.uniforms.progress, {
        value: 1,
        duration: 1.5,
        ease: "power2.inOut",
        onComplete: () => {
          material.uniforms.texture1.value = nextTexture;
          material.uniforms.progress.value = 0;
          lastIndexRef.current = currentIndex;
          isRunningRef.current = false;
          onTransitionEnd?.();
        },
      });
    });

  }, [currentIndex, items]);

  return (
    <div
      ref={containerRef}
      id="hero-slider-gl-container"
      className="absolute inset-0 w-full h-full z-0"
    />
  );
}
