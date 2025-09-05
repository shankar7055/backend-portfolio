import { MeshGradient } from "@paper-design/shaders-react";

export default function MeshGradientShader() {
  return (
    <div className="absolute w-full h-full">
      <MeshGradient speed={0.66} colors={['#C72322', '#FAD942', '#36005F', '#FFFFFF', '#3453CB']} distortion={0.8} swirl={0.31} style={{ width: "100%", height: "100%" }} />
    </div>);
}