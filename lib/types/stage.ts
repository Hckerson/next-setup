export interface CanvasFrame {
    canvas: HTMLCanvasElement;
    width: number;
    height: number;
    time: number;
}

export interface RenderTarget {
    framebuffer: WebGLFramebuffer;
    texture: WebGLTexture;
    width: number;
    height: number;
}
