<template>
  <div class="contentCenter">
    <div class="box">
      <h1>Game of Life</h1>
      <div class="contentLeft">
        Convay's Game of Life ist eine klassische Problemstellung in der Informatik. Es handelt sich dabei um einen zweidimensionalen, zellulären Automaten.
        Ausgangspunkt ist ein Spielfeld mit X mal Y Zellen. Alle Zellen können entweder tot oder lebendig sein (also Status 0 oder 1 haben).<br>
        <div class="contentCenter">
          <br>Der Status der Zellen wird durch die folgenden Reglen bestimmt:<br>

          <ul class="rules contentLeft">
            <li>Jede lebende Zelle, die weniger als 2 lebende Nachbarzellen hat, stirbt.</li>
            <li>Jede lebende Zelle, die 2 oder 3 lebendige Nachbarzellen hat, lebt weiter.</li>
            <li>Jede lebende Zelle, die mehr als 3 lebende Nachbarzellen hat, stirbt.</li>
            <li>Jede tote Zelle, die genau 3 lebende Nachbarzellen hat, wird lebendig.</li>
          </ul>
        </div>
        <br>
        <h2 class="contentCenter">Spielhinweise</h2>
        <ul>
          <li>
            Du kannst das Spielfeld ändern, indem du im Feld <b>Breite oder Höhe den Wert änderst.</b><br>
            Sobald du <b>Enter</b> drückst oder das <b>Feld keinen Fokus</b> mehr hat, passt sich das Spielfeld automatisch an deine Eingaben an.
            <br><br>
          </li>
          <li>
            Du kannst durch <b>Klick auf eine Zelle</b> deren Status ändern, sofern die Option Editierbar aktiviert ist.<br>
            Dadurch ist es dir möglich, jederzeit die <b>aktuelle Generation zu verändern</b> und so Einfluss auf die Evolution zu nehmen.
            <br><br>
          </li>
          <li>
            Durch Klick auf den Button <b>Neues Spiel</b> kannst du jederzeit ein neues Spiel erstellen.<br>
            Dabei wird das Spielfeld zurückgesetzt und mit einer zufälligen Startgeneration belegt.
            <br><br>
          </li>
          <li>
            Der Button <b>Nächster Zyklus</b> ermöglicht dir die nächste Generation innerhalb der Evolution zu erzeugen.
            <br><br>
          </li>
          <li>
            <b>Evolution starten</b> führt im Sekundentakt automatisch den nächsten Zyklus durch, solange bis die Evoluation abgeschlossen ist (es also keine lebende Zellen mehr gibt), oder du die <b>Evolution stoppst</b>.
          </li>
        </ul>
      </div>
      <router-link tag="a" class="btn gradient black border-gold margin" :to="{ name : 'GameScreen'}">Los gehts!</router-link> 
    </div>
  </div>
</template>

<script>
/**
 * Module implements an info screen 
 * @author Florian Manghofer <f.manghofer@googlemail.com>
 * @copyright Florian Manghofer 2018
 */
export default {
  name: "StartScreen",
  data() {
    return {
    };
  }
};
</script>

<style scoped>


.contentCenter {
  text-align: center;
}

.contentLeft{
  text-align: left;
}

.box {
  max-width: 50%;
  margin-top: 5%;
  padding-left: 20px;
  color: #F4F4F4;
  padding-right: 20px;
  padding-bottom: 20px;
  background-color: #373737;
  border-radius: 5px;
  border: 2px solid #DCD0C0;
  display: inline-block;
}

.margin{
  margin:10px;
}
.border-gold{
    border: 1px solid #DCD0C0 !important;
    border-bottom: 4px solid rgba(0,0,0,0.21);
}

.rules{
  display:inline-block;
}

</style>
