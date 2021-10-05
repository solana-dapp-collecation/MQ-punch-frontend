import * as THREE from 'three';

import { getGeometricAttributesOfModelChildByName, calculateCameraParameters } from '../cameraAlgorithms';

import boxerParameters from '../../../constants/boxerParameters';
import { boneNames } from '../../../constants/viewsNames';


const forearmLeftView = (model) => {
  const { childPosition, parentRotation, childQuaternion } = getGeometricAttributesOfModelChildByName(model, boneNames['forearm-left']);

  const positionOffsetVector = new THREE.Vector3(Math.sin(parentRotation.y), 0.0, Math.cos(parentRotation.y));
  const lookAtVector = positionOffsetVector.clone();

  positionOffsetVector.applyQuaternion(childQuaternion);
  lookAtVector.applyQuaternion(childQuaternion);

  positionOffsetVector.multiplyScalar(boxerParameters.scale * -5.0);

  return calculateCameraParameters({ childPosition, positionOffsetVector, lookAtVector });
};

export default forearmLeftView;
