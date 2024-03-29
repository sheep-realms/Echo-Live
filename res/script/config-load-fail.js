"use strict";

function configLoadFail() {
    window.stop();

    $('html link[rel="stylesheet"]').remove();
    $('html title').text('配置文件加载出错');
    $('body').remove();

    alert('配置文件加载出错：配置文件中包含错误，或未找到配置文件。请检查您的配置文件。\n\n配置檔案載入出錯：配置檔案中包含錯誤，或未找到配置檔案。請檢查您的配置檔案。\n\n設定ファイルの読み込みエラー：設定ファイルにエラーが含まれているか、設定ファイルが見つかりません。 設定ファイルを確認してください。\n\n구성 파일 로드 오류: 구성 파일에 오류가 있거나 구성 파일을 찾을 수 없습니다. 구성 파일을 확인하세요.\n\nConfiguration File Loading Error: The configuration file contains an error, or the configuration file was not found. Please check your configuration file.');
}