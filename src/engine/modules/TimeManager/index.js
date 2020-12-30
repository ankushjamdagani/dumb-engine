import { Base, Commons } from '../core';

class TimeManager extends Base {
  constructor(props) {
    super(props);
    const { data, ...restProps } = props;
    const { timeScale, fps } = data;

    this.props = restProps;

    const currTime = (performance || Date).now();

    this.props.syncData({
      timeScale,
      lastTime: 0,
      currTime,
      deltaTime: 1000 / fps,
      deltaTimeMin: 1000 / fps,
      deltaTimeMax: 1000 / (fps * 0.5),
      timestep: 1000 / fps,
      fps,
      fpsLastTick: 0,
      fpsHistory: [],
      fpsUpdateTime: 500
    });
  }

  // https://stackoverflow.com/questions/19764018/controlling-fps-with-requestanimationframe
  update() {
    const currData = this.props.getData();

    const currTime = (performance || Date).now();
    const elapsedTime = currTime - currData.lastTime;

    if (elapsedTime >= currData.timestep) {
      const {
        timestep,
        timeScale,
        fpsUpdateTime,
        fpsHistory,
        deltaTime: prevDeltaTime
      } = currData;
      let { lastTime, fps, fpsLastTick } = currData;

      let deltaTime = prevDeltaTime + elapsedTime;

      /**
       * @DANGER
       * elapsed time can be huge, because RAF get's paused when out of focus
       * - pause the game on out of focus
       * - maybe - keep update running with a slightly bigger steps and render only when on next focus
       * - optionally - can limit delta in a range but this somehow lowers FPS
       */
      // deltaTime = deltaTime < deltaTimeMin ? deltaTimeMin : deltaTime;
      // deltaTime = deltaTime > deltaTimeMax ? deltaTimeMax : deltaTime;

      // compute FPS
      // fps buffer have frames for 1sec. Length of it will give FPS
      while (fpsHistory.length > 0 && fpsHistory[0] <= currTime - 1000) {
        fpsHistory.shift();
      }
      fpsHistory.push(currTime);
      if (currTime - fpsLastTick >= fpsUpdateTime) {
        fps = fpsHistory.length;
        fpsLastTick = currTime;
      }

      const MAX_FRAMES_TO_SKIP = 100;
      const updateCount = Commons.minimum(
        Math.floor(deltaTime / timestep),
        MAX_FRAMES_TO_SKIP
      );

      deltaTime -= updateCount * timestep;
      deltaTime = deltaTime < 0 ? 0 : deltaTime;
      lastTime = currTime - (deltaTime % 10);

      this.props.syncData({
        lastTime,
        fps,
        fpsLastTick,
        fpsHistory,
        deltaTime
      });
      return [
        true,
        {
          updateCount,
          fixedDelta: timestep * timeScale,
          interpolationTime: deltaTime / timestep
        }
      ];
    }
    return [false];
  }
}

export default TimeManager;