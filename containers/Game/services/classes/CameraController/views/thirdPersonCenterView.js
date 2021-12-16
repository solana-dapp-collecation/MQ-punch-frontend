import { Vector3 } from 'three';

import { getGeometricAttributesOfModelChildByName, calculateCameraParameters } from '../cameraAlgorithms';

import boxerParameters from '../../../constants/boxerParameters';
import { modelBoneNames } from '../../../constants/viewNames';


const thirdPersonCenterView = (model) => {
  const { childPosition, parentRotation, childQuaternion } = getGeometricAttributesOfModelChildByName(model, modelBoneNames['neck']);

  const positionOffsetVector = new Vector3(Math.sin(parentRotation.y), Math.sin(-Math.PI / 12.0), Math.cos(parentRotation.y));
  const lookAtVector = positionOffsetVector.clone();

  positionOffsetVector.multiplyScalar(boxerParameters.scale * -20.0);

  return calculateCameraParameters({ childPosition, positionOffsetVector, lookAtVector });
};

export default thirdPersonCenterView;