const DB_NAME = 'alamoudi_fonts_db';
const DB_VERSION = 1;
const STORE_NAME = 'fonts';

// Open IndexedDB
function openDB() {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(DB_NAME, DB_VERSION);
    request.onupgradeneeded = (e) => {
      const db = e.target.result;
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        db.createObjectStore(STORE_NAME, { keyPath: 'id' });
      }
    };
    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  });
}

// Load custom font into document.fonts
export async function registerFontFace(name, fontBuffer) {
  try {
    const font = new FontFace(name, fontBuffer);
    const loadedFont = await font.load();
    document.fonts.add(loadedFont);
    return true;
  } catch (err) {
    console.error('Failed to register font ' + name, err);
    return false;
  }
}

// Save uploaded font to IndexedDB
export async function saveCustomFont(fontMeta, arrayBuffer) {
  const db = await openDB();
  return new Promise((resolve, reject) => {
    const tx = db.transaction(STORE_NAME, 'readwrite');
    const store = tx.objectStore(STORE_NAME);
    const item = {
      id: fontMeta.id,
      name: fontMeta.name,
      fileName: fontMeta.fileName,
      format: fontMeta.format,
      buffer: arrayBuffer,
      createdAt: Date.now()
    };
    const req = store.put(item);
    req.onsuccess = () => resolve(item);
    req.onerror = () => reject(req.error);
  });
}

// Load all saved custom fonts from IndexedDB on startup
export async function loadSavedCustomFonts() {
  try {
    const db = await openDB();
    return new Promise((resolve, reject) => {
      const tx = db.transaction(STORE_NAME, 'readonly');
      const store = tx.objectStore(STORE_NAME);
      const req = store.getAll();
      req.onsuccess = async () => {
        const fonts = req.result || [];
        const loadedList = [];
        for (const f of fonts) {
          const success = await registerFontFace(f.name, f.buffer);
          if (success) {
            loadedList.push({
              id: f.id,
              name: f.name + ' (خط خاص)',
              fontClass: "'" + f.name + "', sans-serif",
              type: 'custom',
              fileName: f.fileName
            });
          }
        }
        resolve(loadedList);
      };
      req.onerror = () => reject(req.error);
    });
  } catch (err) {
    console.warn('Could not load fonts from IndexedDB:', err);
    return [];
  }
}

// Delete custom font
export async function deleteCustomFont(fontId) {
  try {
    const db = await openDB();
    return new Promise((resolve, reject) => {
      const tx = db.transaction(STORE_NAME, 'readwrite');
      const store = tx.objectStore(STORE_NAME);
      const req = store.delete(fontId);
      req.onsuccess = () => resolve(true);
      req.onerror = () => reject(req.error);
    });
  } catch (err) {
    console.error('Failed to delete font:', err);
    return false;
  }
}
