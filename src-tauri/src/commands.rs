use serde::Serialize;
use serde_json::Value;
use std::{fs, io::Write, path::Path, path::PathBuf};
use tauri::{ipc::Response, path::BaseDirectory, App, AppHandle, Manager};

#[derive(Serialize)]
struct System {
    name: String,
    author: String,
    version: String,
    location: String,
}

#[derive(Serialize)]
struct Character {
    name: String,
    class: String,
    race: String,
    level: u64,
    location: String,
}

#[derive(Serialize)]
pub struct LoadFileResponse {
    success: bool,
    data: Option<Vec<u8>>, // File data on success
    error: Option<String>, // Error message on failure
}

/*
Returns
[
    {
        "name": "Yags",
        "author": "Samuel Penn",
        "version": "0.8"
    },
    {
        "name":"someotherttrpg",
        "author":"someone",
        "version":"1.0.5"
    }
*/
#[tauri::command]
pub fn get_systems() -> Result<String, String> {
    let systems = vec![System {
        name: "yags".to_string(),
        author: "Samuel Penn".to_string(),
        version: "0.8.0".to_string(),
        location: "TODO: get from server later".to_string(),
    }];
    let json = serde_json::to_string(&systems).map_err(|e| e.to_string())?;
    Ok(json)
}

#[tauri::command]
pub fn load_file(handle: AppHandle, file_location: String) -> LoadFileResponse {
    println!("File location: {}", file_location);

    let file_path_result = handle
        .path()
        .resolve(file_location, BaseDirectory::Resource);

    match file_path_result {
        Ok(file_path) => match fs::read(&file_path) {
            Ok(data) => LoadFileResponse {
                success: true,
                data: Some(data),
                error: None,
            },
            Err(e) => {
                let error_message = format!("Error reading file: {}", e);
                println!("{}", error_message);
                LoadFileResponse {
                    success: false,
                    data: None,
                    error: Some(error_message),
                }
            }
        },
        Err(e) => {
            let error_message = format!("Error resolving file path: {}", e);
            println!("{}", error_message);
            LoadFileResponse {
                success: false,
                data: None,
                error: Some(error_message),
            }
        }
    }
}

#[tauri::command]
pub fn save_file(file_location: String, character_data: String) -> Result<(), String> {
    println!("File location: {} ", file_location);
    let path = Path::new(&file_location);

    let valid_data: Value = match serde_json::from_str(&character_data) {
        Ok(data) => data,
        Err(e) => return Err(format!("Failed to parse JSON: {}", e)),
    };

    let mut file = match fs::File::create(&path) {
        Ok(f) => f,
        Err(e) => return Err(format!("Failed to create or access file: {}", e)),
    };

    let json_str = match serde_json::to_string(&valid_data) {
        Ok(str) => str,
        Err(e) => return Err(format!("Failed to serialize JSON: {}", e)),
    };

    match file.write_all(json_str.as_bytes()) {
        Ok(_) => Ok(()),
        Err(e) => Err(format!("Failed to save data: {}", e)),
    }
}
#[tauri::command]
pub fn list_files(handle: AppHandle, directory: String) -> Result<Vec<String>, String> {
    // Resolve the directory path using BaseDirectory::Resource
    let dir_path = handle
        .path()
        .resolve(directory, BaseDirectory::Resource)
        .map_err(|e| format!("Error resolving directory path: {}", e))?;

    // Read the directory contents
    let entries = fs::read_dir(dir_path).map_err(|e| format!("Error reading directory: {}", e))?;

    // Collect file and directory names into a vector
    let file_list: Vec<String> = entries
        .filter_map(|entry| entry.ok()) // Filter out errors
        .filter_map(|entry| entry.path().file_name()?.to_str().map(|s| s.to_string()))
        .collect();

    Ok(file_list)
}
