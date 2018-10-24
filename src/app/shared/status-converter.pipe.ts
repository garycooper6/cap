import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'statusConverter'
})

export class StatusConverterPipe implements PipeTransform {

    transform(value: string, character: string): string {
        let converted: string;

        converted = character === '0' ? 'Live' : 'Leaver';

        return value.replace(character, converted);
    }
}
