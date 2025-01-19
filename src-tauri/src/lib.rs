mod commands;
// Learn more about Tauri commands at https://tauri.app/develop/calling-rust/
#[tauri::command]
fn greet(name: &str) -> String {
    format!("Hello, {}! You've been greeted from Rust!", name)
}

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    tauri::Builder::default()
        .plugin(tauri_plugin_opener::init())
        .invoke_handler(tauri::generate_handler![
            commands::load_file,
            commands::save_file,
            commands::list_files,
            commands::get_systems,
        ])
        //ignore error for no OUT_DIR
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
