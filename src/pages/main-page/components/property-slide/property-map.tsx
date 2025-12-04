import {
  YMap,
  YMapDefaultSchemeLayer,
  YMapDefaultFeaturesLayer,
  YMapMarker,
  reactify,
} from '../../../../app/utils/ymaps';
import type { YMapLocationRequest } from 'ymaps3';

const LOCATION: YMapLocationRequest = {
  center: [37.588144, 55.733842],
  zoom: 9,
};

export const PropertyMap = () => {
  return (
    <div>
      <YMap location={reactify.useDefault(LOCATION)}>
        <YMapDefaultSchemeLayer />
        <YMapDefaultFeaturesLayer />

        <YMapMarker
          coordinates={reactify.useDefault([37.588144, 55.733842])}
          draggable={true}
        >
          <section>
            <h1>You can drag this header</h1>
          </section>
        </YMapMarker>
      </YMap>
    </div>
  );
};
