var app = angular.module('appModule', []);
app.controller('appController', function($scope, $http) {
  $scope.orders=[];
  $scope.user=[];
  $scope.user.orderCount=0;
  $scope.user.totalAmount=0;
  $scope.showHomeSection=true;
  $scope.showCheckoutSection=false;
  $scope.showThankyouSection=false; 
  $scope.orderID=0;
  $http.get("southMenu.json")
  .then(function(response){
    // for(var i=0;i<response.data.length;i++){
    //   response.data[i].disableAdd=false;
    //   response.data[i].disableRemove=true;
    // }
    $scope.southIndianMenu=response.data;
    console.log(response);
  },function(error){
    console.log("Error:"+error);
  });

  $http.get("northMenu.json")
  .then(function(response){
    // for(var i=0;i<response.data.length;i++){
    //   response.data[i].disableAdd=false;
    //   response.data[i].disableRemove=true;
    // }
    $scope.northIndianMenu=response.data;
    console.log(response);
  },function(error){
    console.log("Error:"+error);
  });

  $scope.addItemToOrder=function(item){
    item.count=1;
    item.amount=item.count*item.price;
    $scope.orders.push(item);
    $scope.user.orderCount=calculateTotalOrderCount($scope.orders);
    $scope.user.totalAmount=calculateTotalAmount($scope.orders);
  } 
  $scope.removeItemFromOrder=function(item){
    for(var i=0;i<$scope.orders.length; i++){
      if($scope.orders[i].itemName==item.itemName)
        $scope.orders.splice(i,1);
    }
    $scope.user.orderCount=calculateTotalOrderCount($scope.orders);
    $scope.user.totalAmount=calculateTotalAmount($scope.orders);
  }
  $scope.addCountToOrder=function(index,item){
    $scope.orders[index].count++;
    $scope.orders[index].amount=$scope.orders[index].count*$scope.orders[index].price;
    $scope.user.orderCount=calculateTotalOrderCount($scope.orders);
    $scope.user.totalAmount=calculateTotalAmount($scope.orders);
  }
  $scope.removeCountFromOrder=function(index,item){
    $scope.orders[index].count--;
    $scope.orders[index].amount=$scope.orders[index].count*$scope.orders[index].price;
    $scope.user.orderCount=calculateTotalOrderCount($scope.orders);
    $scope.user.totalAmount=calculateTotalAmount($scope.orders);  
  }

  $scope.goToCheckoutSection=function(){
    $scope.showHomeSection=false;
    $scope.showCheckoutSection=true;
    $scope.showThankyouSection=false;
  }

  $scope.goToThankyouSection=function(){
    $scope.orderID++;
    $scope.showHomeSection=false;
    $scope.showCheckoutSection=false;
    $scope.showThankyouSection=true;
  }

  $scope.goToHomeSection=function(){
    $scope.orders=[];
    $scope.user=[];
    $scope.showHomeSection=true;
    $scope.showCheckoutSection=false;
    $scope.showThankyouSection=false;
  }
});
function calculateTotalOrderCount(orders){
  var count=0;
  for(var i=0;i<orders.length;i++){
    count=count+orders[i].count;
  }
  return count;
};
function calculateTotalAmount(orders){
  var amount=0;
  for(var i=0;i<orders.length;i++){
    amount=amount+orders[i].amount;
  }
  return amount;
};

app.directive("home",function(){
  return {
    templateUrl:"home.html" 
  };
});
app.directive("thankyou",function(){
  return {
    templateUrl:"thankyou.html" 
  };
});
app.directive("checkout",function(){
  return {
    templateUrl:"checkout.html" 
  };
});