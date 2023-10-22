import { Pipe, PipeTransform } from '@angular/core';


@Pipe({
  name: 'customdate'
})

export class CustomDatePipe implements PipeTransform {
  transform(datestring: string): string {

    let date = datestring.split(" ")[0];
    let time = datestring.split(" ")[1];

    let datearray = date.split("-")
    let timearray = time.split(":")

    return `${datearray[2]}-${datearray[1]}-${datearray[0]} ${timearray[0]}:${timearray[1]}`;


  //  let dd = value.substr(8, 2);
  //  let MM = value.substr(5, 2);
  //  let yyyy = value.substr(0, 4);
  //  let date = `${dd}.${MM}.${yyyy}`;

  //  return `${date}`;
  }
}
