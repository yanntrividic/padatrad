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
$jsonFile = 'pads.json';

// Read initial JSON data
$pads = readJSON($jsonFile);

// Check if form is submitted
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Update existing entries or add new entry

    $newPads = [];

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
    writeJSON($jsonFile, array_values($newPads)); // Convert associative array to indexed array

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
    <title>Configuration des pads</title>
</head>
<body>
    <h2>Modifier les pads existants</h2>
    <form method="post">
        <?php foreach ($pads as $pad): ?>
            <fieldset>
                <legend><?php echo $pad['id']; ?></legend>
                <label>ID: <input type="text" name="id_<?php echo $pad['id']; ?>" value="<?php echo $pad['id']; ?>" readonly></label><br>
                <label>String: <input type="text" name="string_<?php echo $pad['id']; ?>" value="<?php echo $pad['string']; ?>"></label><br>
                <label>Type: 
                    <input type="radio" name="type_<?php echo $pad['id']; ?>" value="md" <?php if ($pad['type'] == 'md') echo 'checked'; ?>> Markdown
                    <input type="radio" name="type_<?php echo $pad['id']; ?>" value="css" <?php if ($pad['type'] == 'css') echo 'checked'; ?>> CSS
                </label><br>
                <label>URL: <input type="text" name="url_<?php echo $pad['id']; ?>" value="<?php echo $pad['url']; ?>"></label><br>
            </fieldset>
        <?php endforeach; ?>
        <input type="submit" value="Sauvegarder">
    </form>

    <h2>Ajouter un nouveau pad</h2>
    <form method="post">
        <label>ID: <input type="text" name="id"></label><br>
        <label>String: <input type="text" name="string"></label><br>
        <label>Type: 
            <input type="radio" name="type" value="md" checked> Markdown
            <input type="radio" name="type" value="css"> CSS
        </label><br>
        <label>URL: <input type="text" name="url"></label><br>
        <input type="submit" value="Ajouter">
    </form>
</body>
</html>
