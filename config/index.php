<?php
// Function to read JSON file
function readJSON($filename) {
    $data = file_get_contents($filename);
    return json_decode($data, true);
}

// Function to write JSON file
function writeJSON($filename, $data) {
    $json = json_encode($data, JSON_PRETTY_PRINT);
    file_put_contents($filename, $json);
}

// File containing JSON data
$jsonFile = 'config.json'; // Change this to your JSON file name

// Read initial JSON data
$data = readJSON($jsonFile);

// Check if form is submitted
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Update JSON data with form inputs
    foreach ($_POST as $key => $value) {
        // Check if field exists in JSON data
        if (array_key_exists($key, $data)) {
            $data[$key] = $value;
        }
    }

    // Write updated JSON data back to file
    writeJSON($jsonFile, $data);

    // Redirect to prevent form resubmission
    header("Location: ".$_SERVER['PHP_SELF']);
    exit;
}
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Modifier la configuration</title>
    <link href="../assets/styles/book.css" rel="stylesheet">
</head>
<body>
    <h2>Modifier la configuration de Padatrad</h2>
    <form method="post">
        <h3>Généralités</h3>
        <label>Titre : <input type="text" name="title" value="<?php echo $data['title']; ?>"></label><br>
        <label>Texte d'information : <textarea name="infoText"><?php echo $data['infoText']; ?></textarea></label><br>
        <label>Langue source : <input type="text" name="sourceLanguage" value="<?php echo $data['sourceLanguage']; ?>"></label><br>
        <label>Langue cible : <input type="text" name="targetLanguage" value="<?php echo $data['targetLanguage']; ?>"></label><br>
        <label>Langue de l'application : <input type="text" name="appLanguage" value="<?php echo $data['appLanguage']; ?>"></label><br>
        <label>Label de l'URL additionnelle : <input type="text" name="extraUrlLabel" value="<?php echo $data['extraUrlLabel']; ?>"></label><br>
        <label>Lien de URL additionnelle : <input type="text" name="extraUrl" value="<?php echo $data['extraUrl']; ?>"></label><br>
        <label>Typesetting (extension) : <input type="checkbox" name="typesetting" <?php if ($data['typesetting']) echo 'checked'; ?>></label><br>
        <h3>Médadonnées</h3>
        <label>Auteurices : <input type="text" name="author" value="<?php echo $data['author']; ?>"></label><br>
        <label>Description : <textarea name="description"><?php echo $data['description']; ?></textarea></label><br>
        <label>Mots-clés : <input type="text" name="keywords" value="<?php echo $data['keywords']; ?>"></label><br>
        <label>Date : <input type="text" name="date" value="<?php echo $data['date']; ?>"></label><br>
        <label>Licence : <input type="text" name="licence" value="<?php echo $data['licence']; ?>"></label><br>
        <input type="submit" value="Sauvegarder">
    </form>
</body>
</html>
