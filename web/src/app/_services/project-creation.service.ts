import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ProjectCreationService {

  extractCsvData(res: any){
    let csvData = res['_body'] || '';
    let allTextLines = csvData.split(/\r\n|\n/);
    let headers = allTextLines[0].split(',');
    let lines = [];
    for ( let i = 1; i < allTextLines.length-1; i++) {
        // split content based on comma
        let data = allTextLines[i].split(',');
        if (data.length == headers.length) {
            let tarr = [];
            for ( let j = 0; j < headers.length; j++) {
                tarr.push(data[j]);
            }
            lines.push(tarr);
        }
    }
    return lines;
  }

  extractData(res: any) {
    var filteredData: any[] = [];
    var classMatricsData = this.extractCsvData(res);
  
    for (let i = 0; i < classMatricsData.length; i++) {
      for (let j = 0; j < classMatricsData[i].length; j++) {
        if (isNaN(classMatricsData[i][j])) {
          //console.log("This is String ",this.classMatricsData[i][j])
        }
        else {
          classMatricsData[i][j] = Math.round((Math.round((classMatricsData[i][j] * 1 + 0.00001) * 100) / 100) * 100);
        }
      }
    }
  
    let tempRecall: any = [];
    for (let i = 0; i < classMatricsData.length; i++) {
      for (let j = 9; j < 10; j++) {
        if (classMatricsData[i][j] == 'True') {
          tempRecall[i] = 'red';
        }
        else {
          tempRecall[i] = 'green';
        }
      }
    }
  
    for (let i = 0; i < classMatricsData.length; i++) {
      let record = {
        className: classMatricsData[i][0],
        originalExample: classMatricsData[i][4],
        adversarialExample: classMatricsData[i][5],
        diffRecall: tempRecall[i]
      }
      filteredData.push(record);
    }
    // this.showDetailTable = true
    return filteredData
    //sessionStorage.setItem('filterClassMatricsData',JSON.stringify(filteredData));
  }

  extractRNTData(res: any) {
    var filteredData: any[] = [];
    var classMatricsData = this.extractCsvData(res);
  
    for (let i = 0; i < classMatricsData.length; i++) {
      for (let j = 0; j < classMatricsData[i].length; j++) {
        if (isNaN(classMatricsData[i][j])) {
          //console.log("This is String ",this.classMatricsData[i][j])
        }
        else {
          classMatricsData[i][j] = Math.round((Math.round((classMatricsData[i][j] * 1 + 0.00001) * 100) / 100) * 100);
        }
      }
    }
  
    let tempRecall: any = [];
    for (let i = 0; i < classMatricsData.length; i++) {
      for (let j = 9; j < 10; j++) {
        if (classMatricsData[i][j] == 'True') {
          tempRecall[i] = 'red';
        }
        else {
          tempRecall[i] = 'green';
        }
      }
    }
  
    for (let i = 0; i < classMatricsData.length; i++) {
      let record = {
        className: classMatricsData[i][0],
        originalExample: classMatricsData[i][3],
        adversarialExample: classMatricsData[i][4],
        diffRecall: tempRecall[i]
      }
      filteredData.push(record);
    }
    // this.showDetailTable = true
    return filteredData
    //sessionStorage.setItem('filterClassMatricsData',JSON.stringify(filteredData));
  }

}