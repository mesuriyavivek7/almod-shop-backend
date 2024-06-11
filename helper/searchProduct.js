export const searchProduct=(keyword,productsData,limit)=>{
        let filteredData=[]
       if(keyword!==undefined){
        let keys=keyword.split(" ")
        let rowData=[]
        
        productsData.forEach((product)=>{
               let pObj={
                 product,
                 matchCnt:0
               }
            
               keys.forEach(element => {
                  let take=product.title.toLowerCase().includes(element.toLowerCase())
                
                  if(take==true){
                    pObj.matchCnt++;
                  }
               })
               if(pObj.matchCnt>0){
                rowData.push(pObj)
               }

        })
        if(rowData.length>0){
              rowData.sort((a,b)=>(a.matchCnt < b.matchCnt) ? 1 : ((b.matchCnt < a.matchCnt) ? -1 : 0))
          
              if(limit!==undefined){
                let cnt=0;
                while(cnt<limit && cnt<rowData.length){
                  filteredData.push(rowData[cnt].product)
                  cnt++;
                }
              }else{
               rowData.forEach((element)=>{
                  filteredData.push(element.product)
              })
            }
        }
      }
      
        return filteredData

}