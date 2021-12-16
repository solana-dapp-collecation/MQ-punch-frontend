import { Vector3 } from 'three';

import { getGeometricAttributesOfModelChildByName, calculateCameraParameters } from '../cameraAlgorithms';

import boxerParameters from '../../../constants/boxerParameters';
import { modelBoneNames } from '../../../constants/viewNames';


const forearmLeftView = (model) => {
  const { childPosition, parentRotation, childQuaternion } = getGeometricAttributesOfModelChildByName(model, modelBoneNames['forearm-left']);

  const positionOffsetVector = new Vector3(Math.sin(parentRotation.y), 0.0, Math.cos(parentRotation.y));
  const lookAtVector = positionOffsetVector.clone();

  positionOffsetVector.applyQuaternion(childQuaternion);
  lookAtVector.applyQuaternion(childQuaternion);

  positionOffsetVector.multiplyScalar(boxerParameters.scale * -5.0);

  return calculateCameraParameters({ childPosition, positionOffsetVector, lookAtVector });
};

export default forearmLeftView;