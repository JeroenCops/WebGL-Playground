/*
EXAMPLE
rloop = new RenderLoop(function(dt)) {
  console.log(rloop.fps + " " + dt);
},10).start();
*/

class RenderLoop {
  constructor(callback, fps) {
    var oThis = this;
    // The time in Miliseconds of the last frame.
    this.msLastFrame = null;
    // What function to call for each frame.
    this.callback = callback;
    // Control the on/off state of the render loop.
    this.isActive = false;
    // Save the value of how fast the loop is going.
    this.fps = 0;

    // Build a run method that limits the framerate
    if (!fps && fps > 0) {
      // Calculate how many milliseconds are per frame in one second of time.
      this.msFpsLimit = 1000 / fps;

      this.run = function() {
        // Calculate Deltatime between frames and the FPS currently.
        var msCurrent = performance.now(),
            msDelta   = (msCurrent - oThis.msLastFrame),
            // What fraction of a single second is the delta time.
            deltatime = msDelta / 1000.0;

        // Now execute frame since the time has elapsed.
        if (msDelta >= oThis.msFpsLimit) {
          oThis.fps         = Math.floor(1 / deltatime);
          oThis.msLastFrame = msCurrent;
          oThis.callback(deltatime);
        }

        if (oThis.isActive) window.requestAnimationFrame(oThis.run);
      }
    } else {
      // Else build a run method thats optimised as much as possible.
      this.run = function() {
        // Calculate Deltatime between frames and the FPS currently.
        // Gives you the while number of how many milliseconds since the dawn of time
        var msCurrent = performance.now(),
            // ms between frames, then / by 1 second to get the fraction of a second.
            deltatime = (msCurrent - oThis.msLastFrame) / 1000.0;

        // Now executre frame since the time has elapsed.
        // Time it took to generate one frame, divide 1 by that to get how many frames in one second.
        oThis.fps = Math.floor(1 / deltatime);
        oThis.msLastFrame = msCurrent;
        oThis.callback(deltatime);
        if (oThis.isActive) window.requestAnimationFrame(oThis.run);
      }
    }
  }

  start() {
    this.isActive = true;
    this.msLastFrame = performance.now();
    window.requestAnimationFrame(this.run);
    return this;
  }

  stop() { this.isActive = false; }
}
