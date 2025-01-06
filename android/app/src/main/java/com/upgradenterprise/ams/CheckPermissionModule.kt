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


class CheckPermissionModule(reactContext: ReactApplicationContext) : ReactContextBaseJavaModule(reactContext) {
    private var myPromise: Promise? = null

    override fun getName(): String {
        return "CheckPermissionModule"  
    }

    @ReactMethod
    fun checkDevOptionEnable(promise: Promise) {
        val context = reactApplicationContext
        val isEnabled = isDevModeEnabled(context)
        if (isEnabled) {
            promise.resolve(true);
        } else {
            promise.resolve(false);
        }
    }
    
    fun isDevModeEnabled(context: Context): Boolean {
        return when {
            Build.VERSION.SDK_INT > Build.VERSION_CODES.JELLY_BEAN -> {
                Settings.Secure.getInt(context.contentResolver,
                    Settings.Global.DEVELOPMENT_SETTINGS_ENABLED, 0) != 0
            }
            Build.VERSION.SDK_INT == Build.VERSION_CODES.JELLY_BEAN -> {
                @Suppress("DEPRECATION")
                Settings.Secure.getInt(context.contentResolver,
                    Settings.Secure.DEVELOPMENT_SETTINGS_ENABLED, 0) != 0
            }
            else -> false
        }
    }

    @ReactMethod
    fun checkAutomaticDateTimeSet(promise: Promise){
        val context = reactApplicationContext
        val isAutoDateEnabled = isAutomaticDateTimeEnabled(context)
        val isAutoTimeEnabled = isAutomaticTimeZoneEnabled(context)
        if (isAutoDateEnabled && isAutoTimeEnabled) {
            promise.resolve(false);
        } else {
            promise.resolve(true);
        }
    }

    fun isAutomaticDateTimeEnabled(context: Context): Boolean {  
        return Settings.Global.getInt(context.contentResolver, Settings.Global.AUTO_TIME, 0) == 1  
    }  

    fun isAutomaticTimeZoneEnabled(context: Context): Boolean {  
        return Settings.Global.getInt(context.contentResolver, Settings.Global.AUTO_TIME_ZONE, 0) == 1  
    }  
}
