import React, { useState, useEffect } from "react";
import ReactApexChart from "react-apexcharts";
import { axiosApi } from "../api/axios";

const ApexChart = () => {
  const [chartData, setChartData] = useState({
    series: [],
    options: {
      chart: {
        type: "bar",
        height: 350,
      },
      plotOptions: {
        bar: {
          horizontal: false,
          columnWidth: "55%",
          borderRadius: 5,
          borderRadiusApplication: "end",
        },
      },
      dataLabels: {
        enabled: false,
      },
      stroke: {
        show: true,
        width: 2,
        colors: ["transparent"],
      },
      xaxis: {
        categories: [],
        labels: {
          style: {
            colors: "#ffffff",
          },
        },
      },
      yaxis: {
        title: {
          text: "Puntaje",
          style: { color: "#ffffff" },
        },
        labels: {
          style: {
            colors: "#ffffff",
          },
        },
      },
      fill: {
        opacity: 1,
        colors: ["#9b59b6", "#8e44ad", "#5e35b1"],
      },
      tooltip: {
        y: {
          formatter: (val) => `Puntaje: ${val}`,
        },
      },
      legend: {
        labels: {
          colors: "#ffffff",
        },
      },
    },
  });

  const [topPlayers, setTopPlayers] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axiosApi.get("/api/rankingAll");
        const rankings = response.data.rankings;

        const playerScores = {};
        const gameNames = new Set();

        Object.keys(rankings).forEach((game) => {
          rankings[game].forEach(({ PlayerName, Score }) => {
            if (!playerScores[PlayerName]) {
              playerScores[PlayerName] = {};
            }
            if (!playerScores[PlayerName][game]) {
              playerScores[PlayerName][game] = 0;
            }
            playerScores[PlayerName][game] += Score;
            gameNames.add(game);
          });
        });

        const players = Object.keys(playerScores);
        const series = Array.from(gameNames).map((game) => ({
          name: game,
          data: players.map((player) => playerScores[player][game] || 0),
        }));

        // Obtener el Top 3 de cada juego
        const top3Players = {};
        gameNames.forEach((game) => {
          const sortedPlayers = Object.entries(playerScores)
            .map(([player, scores]) => ({
              name: player,
              score: scores[game] || 0,
            }))
            .sort((a, b) => b.score - a.score)
            .slice(0, 3);

          top3Players[game] = sortedPlayers;
        });

        setChartData((prevState) => ({
          ...prevState,
          series: series,
          options: {
            ...prevState.options,
            xaxis: {
              ...prevState.options.xaxis,
              categories: players,
            },
          },
        }));

        setTopPlayers(top3Players);
      } catch (error) {
        console.error("Error al obtener los datos: ", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        marginTop: "20px",
        overflowY: "auto",
        height: "100vh",
      }}
    >
      <h2 style={{ textAlign: "center", marginBottom: "20px", color: "#fff" }}>
        Ranking de Jugadores
      </h2>
      <div
        style={{
          width: "80%",
          maxWidth: "800px",
          background: "rgba(255, 255, 255, 0.1)",
          padding: "20px",
          borderRadius: "10px",
          boxShadow: "0px 0px 15px rgba(155, 89, 182, 0.8)",
          backdropFilter: "blur(10px)",
        }}
      >
        <ReactApexChart
          options={chartData.options}
          series={chartData.series}
          type="bar"
          height={350}
        />
      </div>

      <h3 style={{ textAlign: "center", marginTop: "30px", color: "#fff" }}>
        🏆 Top 3 Mejores Jugadores por Juego
      </h3>
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
          marginTop: "20px",
          marginBottom: "50px",
          gap: "20px",
        }}
      >
        {Object.keys(topPlayers).map((game) => (
          <div
            key={game}
            style={{
              background: "rgba(255, 255, 255, 0.15)",
              padding: "15px",
              borderRadius: "10px",
              boxShadow: "0px 0px 10px rgba(255, 255, 255, 0.3)",
              width: "250px",
              textAlign: "center",
              color: "#fff",
              backdropFilter: "blur(8px)",
            }}
          >
            <h4 style={{ color: "#9b59b6" }}>{game}</h4>
            {topPlayers[game].map((player, index) => (
              <p
                key={player.name}
                style={{
                  fontSize: index === 0 ? "1.2rem" : "1rem",
                  fontWeight: index === 0 ? "bold" : "normal",
                  color: index === 0 ? "#ffd700" : "#ffffff",
                }}
              >
                {index + 1}. {player.name} - {player.score} pts
              </p>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ApexChart;
