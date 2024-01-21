<template>
    <v-footer dark padless>
        <v-col class="text-center" cols="12">
            <span>Copyright©2024 豚豚壁纸</span>

            <span v-if="isShow"><a href="http://beian.miit.gov.cn" one-link-mark="yes"
                    target="_blank">沪ICP备18011999号</a></span>

            <span v-if="isShow">
                <a href="http://www.beian.gov.cn/portal/registerSystemInfo?recordcode=31010602005070" target="_blank"
                    one-link-mark="yes"><img
                        src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAMAAAC6V+0/AAACglBMVEUAAAD89dn+/ODz6KrcrGreqFfYrn3x16769M3oxnyaaVzhs2ifaFXbrGLkvFnpyF7v2X/kwm3cp1nhsGfqw3rntVzjrFPt3oDjvGnbnFGti3q0lH7ktoLryXn9v1T4znr/74bnvGz034v+2I/ktoDz6ZLkwY/Dfz7buoftzYbq2IPr0pjs3bLv6KPRrnbKhFv/+dDZr4Lx38f/+cH/95f42oL7/97s2Y3++uzTk3AAAXgCAWbmulrdmUXWHRcBAm7uzWbpwmLsxl3ktV3qvFr/0ljmwFHksE7fo0raSijXPSDWAgjPAAJrdoeUj4EAAICRiXb143Pyy27w1Gz+z2XtymH/217qyVy7jluTeFrrwFfislP+xVJRNlHpuFDpsErVkEbysETajkPpgj7ThT3ilDvXdTg5FDjdhTXtcTDWZTC7TCbuXiPTOCLJPR/TLhzJJxP9LA+0Bw/QFg2Ej5kcPpdyhZSptJEACJFpfo4AG44XMInFvYfTvIejmYRyeoJzdoK9un7FrnwAEHp8enny2HjWwHjKtnhcX3jYzHfu2HWsonPNwnH70m9WTm8AAW//723pym3dtmm0o2ZeWWb/4mPtwmJuYmL/vmB5ZGAMAF2njVn4xFjYnli0mVjiqVfyyVbmtlbXkVPlvFLNrFKjfVLuvlBgHlDsuU9ODk7/2E02Gk3jqkqEaUr/tUngjkf7n0b6xERCJETdn0K1gD/ooD3Ulj3TZT3WjjzOeDqBWDr3pDlMADnbbTf2gjbkbzaTYDZpAjbplzTEazPXXzOeXzDMPi38jizJWSrVSCrzfCjVdCjTQCbFUiTlYCPiRh7SIRrRDBG/ABHBDAvEGArJAAJrcyAdAAAAOnRSTlMAGghC4MasaVv7+/n39fTw7Ozr5+bk5OHg0tHLx8TDwb68urKxq5+cmJWTjIN8b11MSEFBNTApJyEUZZQtrgAAAW1JREFUGNNigAJGdmkpdkYGZGDMxnN019qlXGwGCDGmiPQDh89lTupOj2CCa5WPjTzlnevps6E8Vhkqasa9esrxC3b5nsWXZ/huEjEHC5oE+M/O8c63u5h7NafRPsAUrFnOz2rLeW87Ly87H6/O/hYFC6Cg3u46/3n7fE5sc1tfnNlj7+eqAxTUONRUMX1jdl5W2t6kqTOtahLVgIIsGUGl9tnJJ/OOnNm/3bq6NZUFKAgY7851ZVZFhVln05ILL1lXxqRIAAVVNofUVu0pulJQ4HnsYHN7b7QmUFAmaX5IiZW19crls6yt6sOc18gCBTnnLkoNaov0nbyko69h2lZbdwGgIMdij4TTc8JWxSS6TnDNSIgOZ2YAifK7pexwcHG3cQi2tZ0oCBZjMBIOd1oY5eQY6uJhE+woBBFUCuxydnZxd4yz9bCxcQhUhYSmFl/cgmXxK+KjnNxCxXVhAWqpr84qKSbKqqhtCOYDALPYc2hoS0J5AAAAAElFTkSuQmCC"
                        style="width: 12px; padding-bottom: 3px; vertical-align: middle;">
                    沪公网安备31010602005070号</a>
            </span>

            <span>作者
                <a href="https://deoncn.github.io" target="_blank">@deoncn</a>
            </span>

            <span v-if="isShow">邮箱 <a href="mailto:1500975085@qq.com">1500975085@qq.com</a>
            </span>

            <span v-if="isShow">监制 <a href="#" target="_blank">@None</a>
            </span>

            <span v-if="isShow" class="friend-link">推荐
                <a href="https://chrome.zzzmh.cn" target="_blank">@极简插件</a>
                <a href="https://tool.zzzmh.cn" target="_blank">@极简工具</a>
            </span>
        </v-col>
    </v-footer>
</template>

<script>
export default {
    data() {
        return {
            isShow: false
        }
    }
}
</script>