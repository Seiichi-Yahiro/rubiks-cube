import { DoWork, runWorker } from 'observable-webworker';
import { Observable } from 'rxjs';
import { RotationCommand } from '../../../cube/algorithms/RotationCommand';
import { ICubicle } from '../../../cube/CubeTypes';
import { map } from 'rxjs/operators';
import { applyRotationCommand } from '../../../cube/CubeUtils';

export interface ApplyRotationCommandWorkerInput {
    rotationCommands: RotationCommand[];
    cubicles: ICubicle[];
    dimension: number;
}

class ApplyRotationCommandWorker
    implements DoWork<ApplyRotationCommandWorkerInput, ICubicle[]> {
    public work(input$: Observable<ApplyRotationCommandWorkerInput>) {
        return input$.pipe(
            map(({ rotationCommands, cubicles, dimension }) =>
                rotationCommands.reduce(
                    (cubicles, command) =>
                        applyRotationCommand(cubicles, command, dimension),
                    cubicles
                )
            )
        );
    }
}

runWorker(ApplyRotationCommandWorker);
