var application = angular.module('myApp', ['ngGrid']);
application.controller('myCtrl', [
    '$scope',
    '$http',
    '$filter',
    function($scope, $http, $filter) {

        $scope.task = '';
        $scope.todoItems = [];
        $scope.AllItems = [];
        $scope.progressItems = [];
        $scope.doneItems = [];

        $scope.addItem = function() {
            if (!$scope.task || $scope.task == '') {
                return
            }
            var id = new Date().getUTCMilliseconds();
            $scope.todoItems.push({ 'id': id, 'text': $scope.task });
            $('#sort1').append('<li id=' + id + '  class="draggable"><div>' + $scope.task + '<i class="fa fa-times" id=' + id + 'i onclick="deleteTask(this.id)"></i></div></li> ')
            $scope.task = '';
        }

        deleteTask = function(id) {

            var id = id.substring(0, id.length - 1);

            for (var i = $scope.todoItems.length - 1; i > -1; i--) {

                if ($scope.todoItems[i]['id'] == id) {
                    $scope.todoItems.splice(i, 1);
                }
            }

            var elem = document.getElementById(id);
            elem.parentNode.removeChild(elem);

        }

        $("#sort1, #sort2, #sort3").sortable({
            helper: "clone",
            opacity: 0.5,
            cursor: "crosshair",
            connectWith: ".list",
            receive: function(event, ui) {
                if ($(ui.sender).attr('id') === 'create') {
                    $(ui.sender).sortable('cancel');
                }
            }
        });

        $("#sort1,#sort2,#sort3").disableSelection();



        // $( "#progress-items" ).disableSelection();



    }
]);