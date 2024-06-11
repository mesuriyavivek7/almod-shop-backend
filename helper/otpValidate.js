export const otpValidate=async (otpTime)=>{
    try{

       const cTime=new Date()

       let diffrantValue=(otpTime-cTime.getTime())/1000
       diffrantValue/=60

       const minutes=Math.abs(diffrantValue)


       if(minutes>1){
          return true
       }else{
          return false
       }

    }catch(err){
        console.log(err)
    }
}