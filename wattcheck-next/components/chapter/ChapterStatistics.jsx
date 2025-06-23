import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale,
} from "chart.js";
import { useTranslation } from "react-i18next";


const capitalize = (str) => str.charAt(0).toUpperCase() + str.slice(1);
ChartJS.register(
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale
);

function ChapterStatistics({ chapters }) {
    const { t } = useTranslation()

  const sortedChapters = [...chapters].sort(
    (a, b) => a.chapterNo - b.chapterNo
  );
  const labels = sortedChapters.map((_, index) => `#${index + 1}`);

  const chartDataList = [
    {
      title: capitalize(t('views')),
      chartData: {
        labels: labels,
        datasets: [
          {
            label: capitalize(t('views')),
            backgroundColor: "oklch(69.6% 0.17 162.48)",
            data: sortedChapters.map((ch) => ch.stats.views),
          },
        ],
      },
    },
    {
      title: capitalize(t('votes')),
      chartData: {
        labels: labels,
        datasets: [
          {
            label: capitalize(t('votes')),
            backgroundColor: "oklch(62.7% 0.265 303.9)",
            data: sortedChapters.map((ch) => ch.stats.stars),
          },
        ],
      },
    },
    {
      title: capitalize(t('comments')),
      chartData: {
        labels: labels,
        datasets: [
          {
            label: capitalize(t('comments')),
            backgroundColor: "oklch(68.5% 0.169 237.323)",
            data: sortedChapters.map((ch) => ch.stats.comments),
          },
        ],
      },
    },
  ];

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        callbacks: {
          title: (tooltipItems) => {
            const index = tooltipItems[0].dataIndex;
            return sortedChapters[index].title;
          },
          label: (tooltipItem) => {
            const datasetLabel = tooltipItem.dataset.label ?? "";
            const formattedValue = tooltipItem.formattedValue ?? "";
            return `${datasetLabel}: ${formattedValue}`;
          },
        },
      },
    },
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  return (
    <div className="space-y-10 p-4 w-full">
      {chartDataList.map((chart) => (
        <div
          className="bg-amber-200 p-4 rounded border border-amber-800 shadow"
          key={chart.title}
        >
          <h2 className="text-lg font-semibold mb-2">{chart.title}</h2>
          <div className="h-64">
            <Bar data={chart.chartData} options={chartOptions} />
          </div>
        </div>
      ))}
    </div>
  );
}

export default ChapterStatistics;
