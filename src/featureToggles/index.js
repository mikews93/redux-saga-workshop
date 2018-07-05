import featureFlags from './featureFlags';

export const isEnabled = featureName => {
  try {
    return featureFlags[featureName].enabled;
  } catch (error) {
    return false;
  }
};

export default { isEnabled };
