function getMin(array) {
            return Math.min.apply(null, array);
        }

        function getMax(array) {
            return Math.max.apply(null, array);
        }

        function getAvg(array) {
            return array.reduce(function(sum, a, i, ar) {
                sum += a;
                return i == ar.length - 1 ? (ar.length == 0 ? 0 : sum / ar.length) : sum
            }, 0);
        }

        var config = {
            parallel: true,
            serial: true,
            files: [{
                size: '1 kb',
                path: "/1KB.txt",
                runs: 25
            }, {
                size: '10 kb',
                path: "/10KB.txt",
                runs: 10
            }, {
                size: '100 kb',
                path: "/100KB.txt",
                runs: 2
            }, {
                size: '1 mb',
                path: "/1MB.txt",
                runs: 1
            }]
        };

        function runTests() {
            config.files.forEach(function(file, index) {
                var timeTaken = [];
                for (var i = 0; i < file.runs; i++) {
                    var startTime = +new Date;
                    fetch(file.path + '?' + (+new Date)).then(function() {

                        document.getElementById('file' + (index + 1)).value++;

                        var run = document.getElementById('runs' + (index + 1));
                        run.innerHTML = parseInt(run.innerHTML) + 1;

                        timeTaken.push(+new Date - startTime);
                        document.getElementById('min' + (index + 1)).innerHTML = getMin(timeTaken);
                        document.getElementById('max' + (index + 1)).innerHTML = getMax(timeTaken);
                        document.getElementById('avg' + (index + 1)).innerHTML = getAvg(timeTaken);

                    });
                }
            });
        }

        function init() {
            var html = '';
            config.files.forEach(function(file, index) {
                html += '<div class="card">' +
                    '<div class="left">File size: ' + file.size + '</div>' +
                    '<div class="right  "><span id="runs' + (index + 1) + '">0</span>/' + file.runs + '</div>' +
                    '<progress  id="file' + (index + 1) + '" value="0" max="' + file.runs + '" class="progressBar"></progress>' +
                    '<div class="clear"></div>' +
                    '<div class="left">' +
                    'Min: <span id="min' + (index + 1) + '">0</span>ms, Max: <span id="max' + (index + 1) + '">0</span>ms' +
                    '</div>' +
                    '<div class="right">' +
                    'Avg: <span id="avg' + (index + 1) + '">0</span>ms' +
                    '</div>' +
                    '</div>'
            });
            document.getElementById('results').innerHTML = html;

            document
                .getElementById('run')
                .addEventListener('click', runTests);
        }

        init();