import { CalculateService } from './calculate.service';
import { SwapsController } from './swaps.controller';

describe('SwapsController', () => {
  let controller: SwapsController;

  beforeEach(async () => {});

  it('should be defined', () => {
    const sample = [
      { coordinates: { lat: 37.788022, lng: -122.399797 } },
      { coordinates: { lat: 37.788404, lng: -122.401926 } },
      { coordinates: { lat: 37.789447, lng: -122.406055 } },
      { coordinates: { lat: 37.791269, lng: -122.409424 } },
      { coordinates: { lat: 37.791719, lng: -122.411662 } },
      { coordinates: { lat: 37.792286, lng: -122.413934 } },
      { coordinates: { lat: 37.792918, lng: -122.415817 } },
      { coordinates: { lat: 37.793238, lng: -122.416937 } },
      { coordinates: { lat: 37.793533, lng: -122.417554 } },
      { coordinates: { lat: 37.793815, lng: -122.417848 } },
    ];
    const distance = CalculateService.tracksDistance(sample as any);
    console.log(distance);
    /**
     * Add more unit tests
     */
    expect(distance).toBeGreaterThan(0);
  });
});
