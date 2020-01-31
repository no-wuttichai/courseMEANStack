import { Pipe, PipeTransform } from '@angular/core';
import { environment } from 'src/environments/environment';

@Pipe({
  name: 'imageAsset'
})
export class ImageAssetPipe implements PipeTransform {

  transform(value: any, ...args: any[]): any {
    return environment.baseUrl + '/' + value;
  }

}
