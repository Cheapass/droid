package in.cheapass.droid.share;

import com.github.alinz.reactNativeShareExtension.ShareExActivity;
import in.cheapass.droid.BuildConfig;


public class ShareActivity extends ShareExActivity {
    @Override
    protected String getMainComponentName() {
        return "CheapassShare";
    }

    @Override
    protected boolean getUseDeveloperSupport() {
        return BuildConfig.DEBUG;
    }
}
