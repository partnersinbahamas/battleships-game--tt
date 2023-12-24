import { AnySrvRecord } from "dns";

export class Mouse {
    under: boolean = false;
    prevUnder: boolean = false;

    x: number | null = null;
    y: number | null = null;

    prevX: number | null = null;
    prevY: number | null = null;

    left: boolean = false;
    prevLeft: boolean = false;

    delta: number = 0;
    prevDelta: number = 0;

  constructor(public element: Element) {
    this.element = element;
    
    // element.addEventListener('mouseenter', (event: MouseEvent) => {});
    // element.addEventListener('mouseleave', () => {});
    // element.addEventListener('mouseup', () => {});
    // element.addEventListener('mousedown', () => {});
    // element.addEventListener('wheel', () => {});
  }

  update(event: React.MouseEvent) {
    this.x = event.clientX;
    this.y = event.clientY;
    this.under = true;
    this.delta = 0;
  }

  onMouseMove = (event: React.MouseEvent) => {
    this.tick();

    this.update(event);

    // console.log(this.x, this.y);
  };

  onMouseEnter = (event: React.MouseEvent) => {
    this.tick();

    this.update(event);



    // console.log(this.x, this.y);
  };

  onMouseLeave = (event: React.MouseEvent) => {
    this.tick();

    this.update(event);
    this.under = false;

    // console.log(this.x, this.y);
  };

  onMouseUp = (event: React.MouseEvent) => {
    this.tick();

    this.update(event);

    if (event.button === 0) {
      this.left = false;
    }
  

    // console.log(this.left, this.prevLeft);
  };

  onMouseDown = (event: React.MouseEvent) => {
    this.tick();

    this.update(event);

    if (event.button === 0) {
      this.left = true;
    }

    // console.log(this.left, this.prevLeft);
  };

  onMouseWheel = (event: React.WheelEvent) => {
    this.tick();

    this.update(event);

    this.delta = event.deltaY > 0 ? 1 : -1;

    // console.log(this.delta);
  };


  tick() {
    this.prevDelta = this.delta;
    this.prevLeft = this.left;
    this.prevUnder = this.under;
    this.prevX = this.x;
    this.prevY = this.y;
  }
}