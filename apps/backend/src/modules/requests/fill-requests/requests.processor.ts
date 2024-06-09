import { OnWorkerEvent, Processor, WorkerHost } from '@nestjs/bullmq';
import { Job } from 'bullmq';

@Processor('requests')
export class RequestsProcessor extends WorkerHost {
  async process(job: Job) {
    console.log('Processing job', job.id);
    // await this.requestsService.processRequest(job.data);
  }

  @OnWorkerEvent('completed')
  onCompleted() {
    console.log('Processing completed');
  }
}
