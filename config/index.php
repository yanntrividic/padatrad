<?php
// Function to read JSON file
function readJSON($filename) {
  $json = file_get_contents($filename);
  return json_decode($json, true);
}

// Function to write JSON file
function writeJSON($filename, $data) {
  $json = json_encode($data, JSON_PRETTY_PRINT);
  file_put_contents($filename, $json);
}

// File containing JSON data
$padsFile = 'pads.json';
$configFile = 'config.json'; // Change this to your JSON file name

// Read initial JSON data
$pads = readJSON($padsFile);
$config = readJSON($configFile);

$newPads = [];

// Check if form is submitted
if($_SERVER["REQUEST_METHOD"] == "POST"){
  if (isset($_POST['submit1'])) {
    foreach ($_POST as $key => $value) {
      // Check if field corresponds to pad data
      if (strpos($key, '_') !== false) {
        // Extract pad ID and field name
        list($id, $field) = explode('_', $key, 2);
        // Update corresponding field in pads array
        $newPads[$field][$id] = $value;
      }
    }

    // Write updated JSON data back to file
    writeJSON($padsFile, array_values($newPads)); // Convert associative array to indexed array
  }

  if (isset($_POST['submit2'])) {
    $newPads = $pads;
    foreach ($_POST as $key => $value) {
      if( $key != "submit2") $newPads["new"][$key] = $value;
    }

    // Write updated JSON data back to file
    writeJSON($padsFile, array_values($newPads)); // Convert associative array to indexed array
  }


  $rename = false;

  if (isset($_POST['submit3'])) {
    // Check if we have to move the config file
    if($_POST['configMenuFilename'] != $config['configMenuFilename']) $rename = true;

    // Update JSON data with form inputs
    foreach ($_POST as $key => $value) {
        // Check if field exists in JSON data
        if (array_key_exists($key, $config)) {
            $config[$key] = $value;
        }
        $config["typesetting"] = !empty($_POST['typesetting']);
        $config["ep_markdown"] = !empty($_POST['ep_markdown']);
        $config["configMenuOverlayButton"] = !empty($_POST['configMenuOverlayButton']);
    }

    // Write updated JSON data back to file
    writeJSON($configFile, $config); // Convert associative array to indexed array
  }

  if($rename) {
    rename(__FILE__, $_POST['configMenuFilename']);
    header("Location: ".$_POST['configMenuFilename']);
  } else {
    // Redirect to prevent form resubmission
    header("Location: ".$_SERVER['PHP_SELF']);
  }
  exit;
}
?>
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Padatrad | Configuration</title>
    <link href="../assets/styles/book.css" rel="stylesheet">
    <meta http-equiv="content-type" content="text/html; charset=utf-8">
    <link rel="icon" type="image/x-icon" href="../favicon.ico">
    <meta name="category" content="padatrad">
    <meta name="description" content="Padatrad permet de traduire collectivement des textes et de les éditer depuis un navigateur web.">
    <meta name="keywords" content="traduction, édition, pagedjs, traduction collective, collaboration, burn~août">
  </head>
  <body>
    <h1>Pads</h1>
    <h2>Modifier les pads existants</h2>
    <form method="post" id="form_1"> <?php foreach ($pads as $pad): ?> <div class="container">
        <div class="draggable" draggable="true">
          <legend> <?php echo $pad['id']; ?> </legend>
          <label>ID : <input type="text" name="id_<?php echo $pad['id']; ?>" placeholder="maSection" value="<?php echo $pad['id']; ?>" onfocus="fixSelectable(this, true)" onblur="fixSelectable(this, false)"></label><br>
          <label>Label : <input type="text" name="string_<?php echo $pad['id']; ?>" placeholder="Ma section" value="<?php echo $pad['string']; ?>" onfocus="fixSelectable(this, true)" onblur="fixSelectable(this, false)"></label><br>
          <label>Type : <input type="radio" name="type_<?php echo $pad['id']; ?>" value="md" <?php if ($pad['type'] == 'md') echo 'checked'; ?>> Markdown <input type="radio" name="type_<?php echo $pad['id']; ?>" value="css" <?php if ($pad['type'] == 'css') echo 'checked'; ?>> CSS </label><br>
          <label>URL : <input type="text" name="url_<?php echo $pad['id']; ?>" placeholder="https://framapad.org/semestriel/p/maSection" value="<?php echo $pad['url']; ?>" onfocus="fixSelectable(this, true)" onblur="fixSelectable(this, false)"></label><br>
        </div>
      </div> <?php endforeach; ?>
      <p><i>Il est possible de drag-and-drop les pads pour changer le chemin de fer du document.</i></p>
      <label>
        <input type="submit" name="submit1" value="Sauvegarder">
      </label>
    </form>
    <h2>Ajouter un nouveau pad</h2>
    <form method="post" id="form_2">
      <label>ID : <input type="text" name="id" placeholder="maSection"></label><br>
      <label>Label : <input type="text" name="string" placeholder="Ma section"></label><br>
      <label>Type : <input type="radio" name="type" value="md" checked> Markdown <input type="radio" name="type" value="css"> CSS </label><br>
      <label>URL : <input type="text" name="url" placeholder="https://framapad.org/semestriel/p/maSection"></label><br>
      <input type="submit" name="submit2" value="Ajouter">
    </form>

    <hr>

    <h1>Configuration de Padatrad</h1>
    <form method="post">
        <h2>Généralités</h2>
        <label>Titre : <input type="text" name="title" value="<?php echo $config['title']; ?>"></label><br>
        <label>Texte d'information : <textarea name="infoText"><?php echo $config['infoText']; ?></textarea></label><br>
        <label>Langue source : <input type="text" name="sourceLanguage" placeholder="en" value="<?php echo $config['sourceLanguage']; ?>"></label><br>
        <label>Langue cible : <input type="text" name="targetLanguage" placeholder="fr" value="<?php echo $config['targetLanguage']; ?>"></label><br>
        <!-- <label>Langue de l'application : <input type="text" name="appLanguage" value="<?php echo $config['appLanguage']; ?>"></label><br> -->
        <label>Label de l'URL additionnelle : <input type="text" name="extraUrlLabel" placeholder="Mon super lien" value="<?php echo $config['extraUrlLabel']; ?>"></label><br>
        <label>Lien de URL additionnelle : <input type="text" name="extraUrl" placeholder="https://monsuperlien.fr" value="<?php echo $config['extraUrl']; ?>"></label><br>
        <?php $checkTypesetting = $config['typesetting']?"checked":""; ?>
        <label>French typesetting (extension) : <input type="checkbox" name="typesetting" <?=$checkTypesetting; ?>></label><br>
        <?php $checkEpMarkdown = $config['ep_markdown']?"checked":""; ?>
        <label>ep_markdown activé sur vos Etherpad : <input type="checkbox" name="ep_markdown" <?=$checkEpMarkdown; ?>></label><br>
        <?php $checkEpConfigBtn = $config['configMenuOverlayButton']?"checked":""; ?>
        <label>Bouton vers le menu de configuration dans le menu latéral : <input type="checkbox" name="configMenuOverlayButton" <?=$checkEpConfigBtn; ?>></label><br>
        <label>Lien vers le menu de configuration (renommez-le pour le cacher des utilisateurices) : <input type="text" name="configMenuFilename" placeholder="index.php" value="<?php echo $config['configMenuFilename']; ?>"></label><br>
        <h2>Médadonnées</h2>
        <label>Auteurices : <input type="text" name="author" value="<?php echo $config['author']; ?>"></label><br>
        <label>Description : <textarea name="description"><?php echo $config['description']; ?></textarea></label><br>
        <label>Mots-clés : <input type="text" name="keywords" value="<?php echo $config['keywords']; ?>"></label><br>
        <label>Date : <input type="text" name="date" value="<?php echo $config['date']; ?>"></label><br>
        <label>Licence : <input type="text" name="licence" value="<?php echo $config['licence']; ?>"></label><br>
        <input type="submit" name="submit3" value="Sauvegarder">
    </form>
    <style>
      body {
        margin: 10px;
      }

      .draggable {
        cursor: move;
        margin: 10px 0;
        padding: 5px;
        border-top: solid 1.5px;
        border-bottom: solid 1.5px;
        background-color: rgba(255, 255, 255, 0.7)
      }

      input {
        margin: 2px;
      }

      input[type="text"] {
        width: 500px;
        max-width: 80%;
      }

      textarea {
        display:block;
        width: 500px;
        max-width: 80%;
        height: 100px;
      }

      hr {
        margin: 80px 0;
      }

      .draggable.dragging {
        opacity: .5;
      }

      legend {
        font-weight: bold;
        margin-bottom: 2px;
      }

      .closeButton {
        right: 10px;
        position: absolute;
      }

      input[name="submit2"], input[name="submit3"] {
        margin-top: 10px;
      }
    </style>
    <script>
      const draggables = document.querySelectorAll('.draggable')
      const containers = document.querySelectorAll('.container')
      draggables.forEach(draggable => {
        draggable.addEventListener('dragstart', () => {
          draggable.classList.add('dragging')
        })
        draggable.addEventListener('dragend', () => {
          draggable.classList.remove('dragging')
        })
      })
      containers.forEach(container => {
        container.addEventListener('dragover', e => {
          e.preventDefault()
          const afterElement = getDragAfterElement(container, e.clientY)
          const draggable = document.querySelector('.dragging')
          if (afterElement == null) {
            container.appendChild(draggable)
          } else {
            container.insertBefore(draggable, afterElement)
          }
        })
      })

      function getDragAfterElement(container, y) {
        const draggableElements = [...container.querySelectorAll('.draggable:not(.dragging)')]
        return draggableElements.reduce((closest, child) => {
          const box = child.getBoundingClientRect()
          const offset = y - box.top - box.height / 2
          if (offset < 0 && offset > closest.offset) {
            return {
              offset: offset,
              element: child
            }
          } else {
            return closest
          }
        }, {
          offset: Number.NEGATIVE_INFINITY
        }).element
      }

      function fixSelectable(oElement, bGotFocus) {
        var oParent = oElement.parentNode;
        while(oParent !== null && !/\bdraggable\b/.test(oParent.className))
          oParent = oParent.parentNode;
        if(oParent !== null)
          oParent.draggable = !bGotFocus;
      }
    </script>
    <script>
      let btn = document.createElement("button")
      btn.innerHTML = "&#x274C;";
      btn.classList = ["closeButton"];
      let legends = document.getElementsByTagName("legend");
      Array.from(legends).forEach(function(legend) {
        legend.insertAdjacentElement("beforeend", btn.cloneNode(true))
      });
      let entries = document.querySelectorAll("code");
      entries.forEach(function(entry) {
        entry.insertAdjacentElement("beforeend", btn.cloneNode(true))
      });
      document.querySelectorAll(".closeButton").forEach(closeBtn => {
        closeBtn.addEventListener("click", removeElement);
      })

      function removeElement(event) {
        event.target.parentElement.parentElement.remove();
      }
    </script>
  </body>
</html>