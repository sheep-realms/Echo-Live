/* ============================================================
 * Echo-Live
 * Github: https://github.com/sheep-realms/Echo-Live
 * License: GNU General Public License 3.0
 * ============================================================
 */


let helpKey = EchoLiveTools.getUrlParam('help');
const driver = window.driver.js.driver;

const tutorialConfirmWindow = new TutorialConfirmWindow(uniWindow);

let hasPrevClick = false;
let updater = new Updater();
updater.localStorageManager = localStorageManager;

$(document).ready(function() {
    translator.ready(() => {
        if (helpKey != null && helpKey != undefined) {
            switch (helpKey) {
                case 'overview':
                    driverShowOverview();
                    break;
            
                default:
                    break;
            }
        } else {
            if (!localStorageManager.getTutorialFlag('editor_overview')) {
                tutorialConfirmWindow.create('editor_overview', driverShowOverview, r => {
                    if (r === 'no') updateCheck();
                });
            } else {
                updateCheck();
            }
        }
    });
});

function driverShowOverview() {
    $('#tabpage-nav-ptext').click();
    let driverObj = {};
    let elementData = [
        null,
        null,
        null,
        '#ptext-character',
        '#ptext-content',
        '#ptext-collapse-use-formatting-code',
        '#ptext-editor .editor-controller',
        '#ptext-content',
        '#popups-palette',
        '#popups-palette .popups-palette-header',
        '#ptext-content',
        '#ptext-content',
        '#popups-image',
        '#popups-image',
        '.tabpage-centent[data-navid="main"] .tabpage-panel[data-pageid="ptext"] .editor-controller-bottom',
        '#echo-editor-nav',
        '.tabpage-centent[data-navid="main"] .tabpage-panel[data-pageid="output"]',
        '.tabpage-centent[data-navid="main"] .tabpage-panel[data-pageid="output"] .editor-controller-bottom',
        '.tabpage-centent[data-navid="main"] .tabpage-panel[data-pageid="log"]'
    ];
    let popoverData = [
        null,
        {
            onPrevClick: () => {
                sysNotice.sendT('help.easter_egg.previous_is_first_step', {}, 'info');
                return;
            }
        },
        {
            onNextClick: () => {
                $('#ptext-character').val($t('help.step.editor_overview.s3.input'));
                driverObj.moveNext();
            },
            onPrevClick: () => {
                if (!hasPrevClick) {
                    hasPrevClick = true;
                    sysNotice.sendT('help.easter_egg.previous', {}, 'trophy');
                    return;
                }
                driverObj.movePrevious();
            }
        }, {
            onNextClick: () => {
                $('#ptext-content').val($t('help.step.editor_overview.s4.input'));
                driverObj.moveNext();
            }
        },
        null,
        {
            onNextClick: () => {
                $('#ptext-collapse-use-formatting-code[aria-checked="false"]').click();
                driverObj.moveNext();
            }
        }, {
            onNextClick: () => {
                $('#ptext-content').val($t('help.step.editor_overview.s7.input'));
                driverObj.moveNext();
            }
        }, {
            onNextClick: () => {
                $('#ptext-editor .editor-controller button[data-value="color"]').click();
                $('#popups-palette .color-box').eq(0).focus();
                driverObj.moveNext();
            }
        },
        null,
        {
            onNextClick: () => {
                popupsDisplay('#popups-palette', false);
                $('#ptext-content').val($t('help.step.editor_overview.s10.input'));
                driverObj.moveNext();
            }
        },
        null,
        {
            onNextClick: () => {
                $('#ptext-editor .editor-controller button[data-value="image"]').click();
                driverObj.moveNext();
            }
        }, {
            onNextClick: () => {
                $('#popups-image .tabpage-nav-item[data-pageid="images"]').click();
                driverObj.moveNext();
            }
        }, {
            onNextClick: () => {
                popupsDisplay('#popups-image', false);
                driverObj.moveNext();
            }
        }, {
            side: "top"
        }, {
            onNextClick: () => {
                $('#ptext-btn-submit').click();
                driverObj.moveNext();
            }
        }, {
            side: "right"
        }, {
            side: "top",
            onNextClick: () => {
                $('#tabpage-nav-log').click();
                driverObj.moveNext();
            }
        }, {
            side: "right",
            onNextClick: () => {
                $('#tabpage-nav-ptext').click();
                sysNotice.send($t('help.step.editor_overview.s19.notice'), '', 'info', {
                    id: 'help-sey-hello',
                    waitTime: 60000
                });
                driverObj.moveNext();
            }
        }, {
            onNextClick: () => {
                sysNotice.killById('help-sey-hello');
                driverObj.moveNext();
            }
        }, {
            onNextClick: () => {
                localStorageManager.setTutorialFlag('editor_overview');
                driverObj.moveNext();
                updateCheck();
            }
        }
    ];

    driverObj = driver(
        EchoLiveTools.generateDriverData(
            {
                onDestroyStarted: () => {
                    driverObj.destroy();
                    updateCheck();
                }
            },
            EchoLiveTools.generateDriverSteps('editor_overview', 20, elementData, popoverData)
        )
    );
    driverObj.drive();
}

function updateCheck() {
    updater.updateCheck(r => {
        if (r.state !== 'success') return;
        if (!r.data.hasNewReleases || !r.data.newReleasesNotChecked) return;
        sysNotice.send(
            $t('updater.notice_content_editor'),
            $t('updater.notice_title', { version: r.data.newReleasesTag }),
            'info',
            { icon: 'material:update', waitTime: -1 }
        )
    });
}