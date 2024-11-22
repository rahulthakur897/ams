package com.upgradenterprise.ams  

import android.app.Activity
import android.content.Intent
import android.net.Uri
import android.os.Build
import android.os.Environment
import android.provider.Settings
import com.facebook.react.bridge.Promise
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.ReactContextBaseJavaModule
import com.facebook.react.bridge.ReactMethod


class RequestStorageModule(reactContext: ReactApplicationContext) : ReactContextBaseJavaModule(reactContext) {
    private var myPromise: Promise? = null

    override fun getName(): String {
        return "RequestStorageModule"  
    }

    @ReactMethod
    fun fileAccessPermission(promise: Promise) {
        promise.resolve("Hello from Kotlin!")
    }
}
