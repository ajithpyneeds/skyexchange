if(typeof FancyBetExposureHandler=="undefined"){FancyBetExposureHandler={}}(function(){FancyMarketExposureObj={eventId:null,marketId:null,marketExposure:0,betRunsPL:{},betRunsExposures:{}};RunsProfitLossObj={runs:null,sideType:null,equalGreaterThanRunsTotalPL:0,lessThanRunsTotalPL:0};function e(){FancyMarketExposureObj.eventId=null;FancyMarketExposureObj.marketId=null;FancyMarketExposureObj.marketExposure=0;FancyMarketExposureObj.betRunsPL={};FancyMarketExposureObj.betRunsExposures={};RunsProfitLossObj.runs=null;RunsProfitLossObj.sideType=null;RunsProfitLossObj.equalGreaterThanRunsTotalPL=0;RunsProfitLossObj.lessThanRunsTotalPL=0}FancyBetExposureHandler.getMarketExposure=function(){return a(FancyMarketExposureObj)};FancyBetExposureHandler.setMarketExposure=function(f){e();FancyMarketExposureObj=a(f)};FancyBetExposureHandler.initMarketInfo=function(f,g){e();FancyMarketExposureObj.eventId=f;FancyMarketExposureObj.marketId=g;FancyMarketExposureObj.betRunsExposures[0]=0};FancyBetExposureHandler.generatorBetTicketObj=function(f,n,l,p,h,j,k){var g=MathUtil.decimal.multiply(j==1?-1:1,h);var m=MathUtil.decimal.multiply(j==1?1:-1,MathUtil.decimal.divide(MathUtil.decimal.multiply(p,h),100));var i=(j==1?1:-1)*l;var o=false;if(typeof(PageConfig)!="undefined"){o=PageConfig.ENABLE_FANCY_BET_VOID_LATE_CLOSE_RETURN_EXPOSURE}if(typeof(PageCommonConfig)!="undefined"){o=PageCommonConfig.ENABLE_FANCY_BET_VOID_LATE_CLOSE_RETURN_EXPOSURE}if(o){if(MyTransactionUtils.isVoid(k)){g=0;m=0}}return{eventId:f,marketId:n,sideType:j,runsId:i,runs:l,lessThanRunsPL:g,equalGreaterThanRunsPL:m}};FancyBetExposureHandler.calculateExposure=function(f){if(!$j.isArray(f)){throw"betTickets must bet array type.[betTicketObj....]"}$j.each(f,function(g,h){FancyMarketExposureObj.marketExposure=c(h)})};function c(j){var l=j.runsId;var k=j.lessThanRunsPL;var h=j.equalGreaterThanRunsPL;var i=j.runs;var g=j.sideType;var f=FancyMarketExposureObj.betRunsPL[l];if($j.isEmptyObject(f)){f=a(RunsProfitLossObj);f.runs=i;f.sideType=g;f.lessThanRunsTotalPL=k;f.equalGreaterThanRunsTotalPL=h;FancyMarketExposureObj.betRunsPL[l]=f}else{f.lessThanRunsTotalPL=MathUtil.decimal.add(f.lessThanRunsTotalPL,k);f.equalGreaterThanRunsTotalPL=MathUtil.decimal.add(f.equalGreaterThanRunsTotalPL,h)}return b(k,h,i)}function b(j,h,i){var g=0;var f=FancyMarketExposureObj.betRunsExposures[i];if(null==f){f=h;$j.each(FancyMarketExposureObj.betRunsPL,function(m,k){var l=k.runs;if(l==i){return}if(i>l){f=MathUtil.decimal.add(f,k.equalGreaterThanRunsTotalPL)}else{f=MathUtil.decimal.add(f,k.lessThanRunsTotalPL)}})}else{f=MathUtil.decimal.add(f,h)}FancyMarketExposureObj.betRunsExposures[i]=f;g=d(g,f);$j.each(FancyMarketExposureObj.betRunsExposures,function(l,k){if(l==i){return}if(i<l){k=MathUtil.decimal.add(k,h)}else{k=MathUtil.decimal.add(k,j)}FancyMarketExposureObj.betRunsExposures[l]=k;g=d(g,k)});return g}function a(f){return JSON.parse(JSON.stringify(f))}function d(g,f){return g>f?f:g}})();