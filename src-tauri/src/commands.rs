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

//i love shenanigans
#[tauri::command]
pub fn get_yags() -> Result<String, String> {
    let json = r#"
    {
        "name": "yags",
        "author": "Samuel Penn",
        "version": "0.8.0",
        "characterCreation": {
            "categories": [
                {
                    "name": "Power Level",
                    "type": "dropdown",
                    "options": [
                        {
                            "label": "Mundane",
                            "table": {
                                "Attributes": {
                                    "Primary": "+5/5",
                                    "Secondary": "+2/4",
                                    "Tertiary": "0/4"
                                },
                                "Experience": {
                                    "Primary": "50/6",
                                    "Secondary": "30/5",
                                    "Tertiary": "20/4"
                                },
                                "Advantages": {
                                    "Primary": "3",
                                    "Secondary": "1",
                                    "Tertiary": "0"
                                }
                            },
                            "description": "Mundane campaigns are about normal people in abnormal situations (or even normal people in normal situations). In this type of campaign, characters are somewhat above average, but not significantly so. This level of campaign is suitable for modern horror, or stories about young, inexperienced knights at the start of their careers. There is no reason that characters in such campaigns can't grow to become heroic, but the story is often about their progression rather than what they do once they become heroes. The majority of people in the world will be of the Mundane level - indeed, most will have a Tertiary level in each of the three categories. Skilled professionals will tend to have Primary experience however."
                        },
                        {
                            "label": "Skilled",
                            "table": {
                                "Attributes": {
                                    "Primary": "+5/5",
                                    "Secondary": "+2/4",
                                    "Tertiary": "0/4"
                                },
                                "Experience": {
                                    "Primary": "100/6",
                                    "Secondary": "60/5",
                                    "Tertiary": "40/4"
                                },
                                "Advantages": {
                                    "Primary": "3",
                                    "Secondary": "1",
                                    "Tertiary": "0"
                                }
                            },
                            "description": "Skilled characters are mundane with some extra skills. This level of campaign is useful when the GM wants reasonably average characters, but where their backgrounds imply more than the average number of skills - for example, academics or trained professionals. Such characters are recommended as the default for a modern setting, unless the campaign is focussed around highly trained or heroic characters, or it is a horror game where everything is meant to be dangerous, and out to get you."
                        },
                        {
                            "label": "Exceptional",
                            "table": {
                                "Attributes": {
                                    "Primary": "+8/6",
                                    "Secondary": "+5/5",
                                    "Tertiary": "+2/4"
                                },
                                "Experience": {
                                    "Primary": "100/7",
                                    "Secondary": "75/6",
                                    "Tertiary": "50/5"
                                },
                                "Advantages": {
                                    "Primary": "4",
                                    "Secondary": "2",
                                    "Tertiary": "1"
                                }
                            },
                            "description": "If you are playing in an exceptional campaign, then you will begin with a character who is well above average in both attributes and skills however you prioritise your pools. Such campaigns are about exceptional people and high adventure. Most of the people you meet will not be as good as you, allowing you to take on greater dangers than in less high powered campaigns. However, by the start of the campaign you are already a professional in what you do. Such stories are not about a farm boy (or school teacher) who gets caught up in an adventure by accident, but about adventurers who go looking for something exciting. It is suggested that Exceptional characters begin the game with one free point of Luck. This is in addition to any that they purchase with advantages."
                        },
                        {
                            "label": "Heroic",
                            "table": {
                                "Attributes": {
                                    "Primary": "+12/8",
                                    "Secondary": "+6/6",
                                    "Tertiary": "+3/5"
                                },
                                "Experience": {
                                    "Primary": "200/10",
                                    "Secondary": "150/8",
                                    "Tertiary": "100/6"
                                },
                                "Advantages": {
                                    "Primary": "6",
                                    "Secondary": "3",
                                    "Tertiary": "1"
                                }
                            },
                            "description": "In a heroic campaign you have skills and abilities well above the majority of people. However you choose to spend your points, you are going to be very good at what you do, being the equivalent of Hollywood action heroes. However, you shouldn't let this go to your head, since a single bullet or well placed knife can still kill you just as easily as it could a 'mundane' person. In addition to the above, you should start the game with two free points of Luck, in addition to any extra that you purchase with advantages."
                        },
                        {
                            "label": "Pulp Action",
                            "table": {
                                "Attributes": {
                                    "Primary": "+18/8",
                                    "Secondary": "+12/6",
                                    "Tertiary": "+6/5"
                                },
                                "Experience": {
                                    "Primary": "450/12",
                                    "Secondary": "300/10",
                                    "Tertiary": "200/8"
                                },
                                "Advantages": {
                                    "Primary": "8",
                                    "Secondary": "4",
                                    "Tertiary": "2"
                                }
                            },
                            "description": "Whether it's Space Opera, Chanbara, Wuxia or a Hollywood Action Film, there is room in fiction for the larger than life action hero. Almost super-heroic in their abilities, they are capable of taking on a small army by themselves. If you are playing this sort of campaign, then your character will be significantly better than everyone else even in your weakest area. In addition to the above, you start the game with three free points of Luck."
                        }
                    ]
                }
            ]
        }
    }
    "#;

    Ok(json.to_string())
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
