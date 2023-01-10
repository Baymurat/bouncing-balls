import { BehaviorSubject, fromEvent } from "rxjs";
import { throttleTime } from "rxjs/operators";
import { ResizeEmission } from "../types/types";

const resizeSubject = new BehaviorSubject<ResizeEmission>({ width: 0, height: 0 });

export const resizeHelper = {
  size$: resizeSubject.asObservable(),
  windowResize$: fromEvent(window, "resize").pipe(
    throttleTime(200, undefined, { trailing: true, leading: false }),
  ),
  emmitResize: (div: HTMLDivElement | null) => {
    if (div) {
      const { width, height } = div.getBoundingClientRect();
      resizeSubject.next({ width, height });
    }
  },
};
