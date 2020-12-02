<template>
    <FormDlg title="编辑通道名称" @hide="onHide" @show="onShow" @submit="onSubmit" ref="dlg" >
        <div :class="{'form-group':true}">
            <label for="input-serial" class="col-sm-4 control-label">设备编号
                <span class="text-red">*</span>
            </label>
            <div class="col-sm-7">
                <input type="text" class="form-control" readonly="readonly" id="input-serial" name="serial" :value="form.serial" data-vv-as="设备编号" >
            </div>
        </div>
        <div :class="{'form-group':true}">
            <label for="input-code" class="col-sm-4 control-label">通道编号
                <span class="text-red">*</span>
            </label>
            <div class="col-sm-7">
                <input type="text" class="form-control" readonly="readonly" id="input-code" name="code" :value="form.code" data-vv-as="通道编号">
            </div>
        </div>
        <div :class="{'form-group':true}">
            <label for="input-name" class="col-sm-4 control-label">自定义名称
            </label>
            <div class="col-sm-7">
                <input type="text" class="form-control" id="input-name" name="name" :placeholder="form.name||'-'" v-model.trim="form.customName" data-vv-as="自定义名称" @keydown.enter="onSubmit">
            </div>
        </div>
    </FormDlg>
</template>

<script>
import FormDlg from './FormDlg.vue'
import $ from 'jquery'

export default {
    data() {
        return {
            form: this.defForm(),
        }
    },
    components: {
        FormDlg
    },
    methods: {
        defForm() {
            return {
                serial: '',
                code: '',
                name: '',
                customName: '',
            }
        },
        onHide() {
            this.form = this.defForm();
            this.$emit("hide");
        },
        onShow() {
            this.$emit("show");
            this.$el.querySelector('#input-name').focus()
        },
        async onSubmit() {
            $.get('/api/v1/device/setchannelname', {
                serial: this.form.serial,
                code: this.form.code,
                name: this.form.customName,
            }).then(data => {
                this.$refs['dlg'].hide();
                this.$emit("submit");
            })
        },
        show(data) {
            if(data) {
                this.form.serial = data.serial;
                this.form.code = data.code;
                this.form.name = data.name;
                this.form.customName = data.customName;
                if(data.custom) {
                    this.form.customName = data.name;
                    this.form.name = '';
                }
            }
            this.$nextTick(() => {
                this.$refs['dlg'].show();
            })
        }
    }
}
</script>

<style scoped src="../../../../node_modules/font-awesome/css/font-awesome.css"></style>
<style scoped src="../../../../node_modules/bootstrap/dist/css/bootstrap.css"></style>
<style scoped src="../../../../node_modules/admin-lte/dist/css/AdminLTE.css"></style>
<style scoped src="../../../../node_modules/admin-lte/dist/css/skins/_all-skins.css"></style>
<style scoped src="../../../../node_modules/vue-resize/dist/vue-resize.css"></style>