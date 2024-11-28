package com.upgradenterprise.ams  

import android.app.Activity
import android.content.ContentValues
import android.content.Context
import android.content.Intent
import android.net.Uri
import android.os.Build
import android.os.Environment
import android.provider.MediaStore
import android.provider.Settings
import com.facebook.react.bridge.Promise
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.ReactContextBaseJavaModule
import com.facebook.react.bridge.ReactMethod
import okhttp3.ResponseBody
import java.io.File
import java.io.InputStream
import java.io.OutputStream


class RequestStorageModule(reactContext: ReactApplicationContext) : ReactContextBaseJavaModule(reactContext) {
    private var myPromise: Promise? = null

    override fun getName(): String {
        return "RequestStorageModule"  
    }

    @ReactMethod
    fun fileAccessPermission(fileName: String, apiResponse: File, promise: Promise) {
        saveFileToExternalStorage(fileName, apiResponse);
        promise.resolve("Hello from Kotlin!");
    }

    fun saveFileToExternalStorage(fileName: String, body: File) {
        val context = reactApplicationContext
        val contentResolver = context.contentResolver

        val contentValues = ContentValues().apply {
            put(MediaStore.MediaColumns.DISPLAY_NAME, fileName)
            put(MediaStore.MediaColumns.MIME_TYPE, "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet")
            put(MediaStore.MediaColumns.RELATIVE_PATH, Environment.DIRECTORY_DOWNLOADS)
        }

        val uri = contentResolver.insert(MediaStore.Downloads.EXTERNAL_CONTENT_URI, contentValues)

        uri?.let {
            contentResolver.openOutputStream(it).use { outputStream ->
                val inputStream = body.inputStream()
                writeToFile(inputStream, outputStream)
            }
        }
    }

    fun writeToFile(inputStream: InputStream, outputStream: OutputStream?) {
        outputStream?.let { out ->
            inputStream.use { input ->
                val buffer = ByteArray(1024)
                var bytesRead: Int
                while (input.read(buffer).also { bytesRead = it } != -1) {
                    out.write(buffer, 0, bytesRead)
                }
                out.flush()
            }
        }
    }

    @ReactMethod
    fun checkDevOptionEnable(promise: Promise) {
        val context = reactApplicationContext
        val isEnabled = isDeveloperOptionsEnabled(context)
        if (isEnabled) {
            promise.resolve(false);
        } else {
            promise.resolve(false);
        }
    }
    

    fun isDeveloperOptionsEnabled(context: Context): Boolean {
    return try {
        Settings.Global.getInt(
            context.contentResolver,
            Settings.Global.DEVELOPMENT_SETTINGS_ENABLED
        ) == 1
    } catch (e: Settings.SettingNotFoundException) {
        false // Developer Options setting not found
    }
}
}
