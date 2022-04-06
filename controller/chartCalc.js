var chartData = [
    {
        name: "Sunday",
        Total: 0
    },
    {
        name: "Monday",
        Total: 0
    },
    {
        name: "Tuesday",
        Total: 0
    },
    {
        name: "Wednesday",
        Total: 0
    },
    {
        name: "Thursday",
        Total: 0
    },
    {
        name: "Friday",
        Total: 0
    },
    {
        name: "Saturday",
        Total: 0
    }
];

const contactData = [
    {
        name: "1",
        date: '2022-04-06T06:51:27.207Z'
    },
    {
        name: "2",
        date: '2022-04-05T06:51:27.207Z'
    },
    {
        name: "3",
        date: '2022-04-04T06:51:27.207Z'
    },
    {
        name: "4",
        date: '2022-04-03T06:51:27.207Z'
    },
    {
        name: "5",
        date: '2022-04-02T06:51:27.207Z'
    },
    {
        name: "6",
        date: '2022-04-01T06:51:27.207Z'
    },
    {
        name: "7",
        date: '2022-03-31T06:51:27.207Z'
    },
    {
        name: "a",
        date: '2022-04-06T06:51:27.207Z'
    },
    {
        name: "a",
        date: '2022-04-06T06:51:27.207Z'
    },
    {
        name: "a",
        date: '2022-04-06T06:51:27.207Z'
    },
    {
        name: "a",
        date: '2022-04-05T06:51:27.207Z'
    },
    {
        name: "a",
        date: '2022-04-02T06:51:27.207Z'
    },
    {
        name: "a",
        date: '2022-04-04T06:51:27.207Z'
    },
    {
        name: "a",
        date: '2022-03-31T06:51:27.207Z'
    },
    {
        name: "a",
        date: '2022-03-05T06:51:27.207Z'
    },
    {
        name: "a",
        date: '2022-03-02T06:51:27.207Z'
    },
    {
        name: "a",
        date: '2022-03-04T06:51:27.207Z'
    },
    {
        name: "a",
        date: '2022-03-30T06:51:27.207Z'
    },
    {
        name: "xx",
        date: '2022-04-01T06:51:27.207Z'
    }

]

function chartCalc(data){
    var chartData = [
        {
            name: "Sunday",
            Total: 0
        },
        {
            name: "Monday",
            Total: 0
        },
        {
            name: "Tuesday",
            Total: 0
        },
        {
            name: "Wednesday",
            Total: 0
        },
        {
            name: "Thursday",
            Total: 0
        },
        {
            name: "Friday",
            Total: 0
        },
        {
            name: "Saturday",
            Total: 0
        }
    ];
    const filteredData = data.filter(
        item => {
            var sixDaysAgo = new Date(new Date().setDate(new Date().getDate() - 7));
            return new Date(item.created).getTime() > sixDaysAgo.getTime()
        }
    )
    const temp = []
    filteredData.map(data => {
        var date = new Date(data.created)
        var day = date.toLocaleString('en-us', { weekday: 'long' })
        temp.push(day)
    })
    const counts = {};
    temp.forEach((x) => {
        counts[x] = (counts[x] || 0) + 1;
    });
    chartData.forEach(
        item => {
            if (item.name == 'Sunday') {
                item.Total = counts.Sunday?counts.Sunday:0
            } else if (item.name == 'Monday') {
                item.Total = counts.Monday?counts.Monday:0
            } else if (item.name == 'Tuesday') {
                item.Total = counts.Tuesday?counts.Tuesday:0
            } else if (item.name == 'Wednesday') {
                item.Total = counts.Wednesday?counts.Wednesday:0
            } else if (item.name == 'Thursday') {
                item.Total = counts.Thursday?counts.Thursday:0
            } else if (item.name == 'Friday') {
                item.Total = counts.Friday?counts.Friday:0
            } else {
                item.Total = counts.Saturday?counts.Saturday:0
            }
        }
    )
    console.log(chartData)
    var finaldata = sort(chartData)
    return(finaldata)
}

function sort(data){
    var k =6-new Date().getDay()
    var n = data.length
    var data1 = reverse(data, 0, n - k - 1)
    var data2 = reverse(data1, n - k, n - 1)
    return (reverse(data2,0, n - 1))

}
function reverse(arr, low, high) {
    while (low < high) {
        var a = arr[high]
        arr[high] = arr[low]
        arr[low] = a
        low += 1
        high -= 1
    }
    return arr
}

module.exports = chartCalc
