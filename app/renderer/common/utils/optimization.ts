// 防抖函数
export function debounce<T extends (...args: any[]) => void>(func: T, delay: number): T {
  let timerId: ReturnType<typeof setTimeout>;
  return function (this: any, ...args: Parameters<T>) {
    if (timerId) {
      clearTimeout(timerId);
    }
    timerId = setTimeout(() => {
      func.apply(this, args);
    }, delay) as ReturnType<typeof setTimeout>;
  } as T;
}

// 节流函数
export function throttle<T extends (...args: any[]) => void>(func: T, delay: number): T {
  let timerId: ReturnType<typeof setTimeout>;
  let lastExecTime = 0;
  return function (this: any, ...args: Parameters<T>) {
    const now = Date.now();
    if (now - lastExecTime < delay) {
      if (timerId) {
        clearTimeout(timerId);
      }
      timerId = setTimeout(() => {
        lastExecTime = now;
        func.apply(this, args);
      }, delay) as ReturnType<typeof setTimeout>;
    } else {
      lastExecTime = now;
      func.apply(this, args);
    }
  } as T;
}