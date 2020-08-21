import { generateCubicles } from '../../../cube/CubeUtils';
import { ICubicle } from '../../../cube/CubeTypes';
import { DoWork, runWorker } from 'observable-webworker';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

export interface GenerateCubiclesWorkerInput {
    cubeSize: number;
    gapFactor: number;
    dimension: number;
}

class GenerateCubiclesWorker
    implements DoWork<GenerateCubiclesWorkerInput, ICubicle[]> {
    public work(input$: Observable<GenerateCubiclesWorkerInput>) {
        return input$.pipe(
            map(({ cubeSize, gapFactor, dimension }) =>
                generateCubicles(cubeSize / dimension, gapFactor, dimension)
            )
        );
    }
}

runWorker(GenerateCubiclesWorker);
