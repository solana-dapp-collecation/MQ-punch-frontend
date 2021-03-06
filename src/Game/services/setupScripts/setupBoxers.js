import { AnimationMixer, LoopOnce, LoopRepeat } from 'three';
import { SkeletonUtils } from 'three-stdlib';

import { loadFBX } from '../algorithms/assetsLoaders';

import webGLParameters from '../constants/webGLParameters';
import boxerParameters from '../constants/boxerParameters';
import ringParameters from '../constants/ringParameters';
import animationsNames, { loopedAnimationsNames } from '../constants/animationsNames';

import Boxer from '../classes/Boxer/Boxer';


const MODEL_NAME = 'ybot';


const setupBoxers = async (scene) => {
  let leftModel, rightModel;
  let leftAnimationMixer, rightAnimationMixer;
  const leftAnimationActions = {}, rightAnimationActions = {};

  const modelsLoadingPromise = loadFBX('../../../../assets/models/' + MODEL_NAME + '.fbx')
  .then((model) => {
    model.traverse((obj) => {
      obj.layers.set(webGLParameters.layers.NORMAL);
    });

    const scaleCoefficient = boxerParameters.scale * 0.15;
    model.scale.set(scaleCoefficient, scaleCoefficient, scaleCoefficient);

    leftModel = SkeletonUtils.clone(model);
    leftModel.rotation.y = Math.PI / 2;
    leftModel.position.set(ringParameters.canvas.width / 4, 0, ringParameters.canvas.width / 2);

    rightModel = SkeletonUtils.clone(model);
    rightModel.rotation.y = -Math.PI / 2;
    rightModel.position.set(ringParameters.canvas.width * 3 / 4, 0, ringParameters.canvas.width / 2);

    scene.add(leftModel, rightModel);

    leftAnimationMixer = new AnimationMixer(leftModel);
    rightAnimationMixer = new AnimationMixer(rightModel);
  }).catch((error) => {
    console.log(error);
  });

  await modelsLoadingPromise;

  const animationsLoadingPromises =
    animationsNames.map((name) => loadFBX('../../../../assets/animations/' + name + '.fbx')
    .then((animation) => {
      leftAnimationActions[name] = leftAnimationMixer.clipAction(animation.animations[0]);
      leftAnimationActions[name].setLoop(loopedAnimationsNames.includes(name) ? LoopRepeat : LoopOnce);
      leftAnimationActions[name].clampWhenFinished = true;
      rightAnimationActions[name] = rightAnimationMixer.clipAction(animation.animations[0]);
      rightAnimationActions[name].setLoop(loopedAnimationsNames.includes(name) ? LoopRepeat : LoopOnce);
      rightAnimationActions[name].clampWhenFinished = true;
    }).catch((error) => {
      console.log(error);
    })
  );

  await Promise.all(animationsLoadingPromises);

  return {
    leftBoxer: new Boxer(leftModel, leftAnimationMixer, leftAnimationActions),
    rightBoxer: new Boxer(rightModel, rightAnimationMixer, rightAnimationActions),
  };
};

export default setupBoxers;
