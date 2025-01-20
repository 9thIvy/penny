mod commands;
// Learn more about Tauri commands at https://tauri.app/develop/calling-rust/

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    tauri::Builder::default()
        .plugin(tauri_plugin_opener::init())
        .plugin(tauri_plugin_fs::init())
        .invoke_handler(tauri::generate_handler![
            commands::load_file,
            commands::save_file,
            commands::list_files,
            commands::get_systems,
            commands::get_yags,
        ])
        //ignore error for no OUT_DIR
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
