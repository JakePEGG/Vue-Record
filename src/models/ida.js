export default {
    manifest: window.ida.manifest,
    currentPresentationSlides: window.ida.manifest.matrix.flat(),
    currentSlide: window.ida.slide.slide,
    currentTemplate: window.ida.template.template,
    currentPresentation: window.ida.presentation,


    allPresentations: null,
    presentations: null,
    briefcases: null,
    briefcaseSlides: null,
    briefcaseCategories: null,

    isBriefcase(presentation) {
        return presentation.data.briefcase;
    },



    isNotBriefcase(presentation) {
        return !presentation.data.briefcase;
    },

    parseMetaDataFromTitle(title) {

        const result = {
            data: {},
            title: title
        }
        // this is a very very rough scan for an inline JSON string in the title... 
        // this is only for POC, for production we need to pass meta data fro IDA -> Vault -> CRM -> Mobile CRM
        const regex = /({\s*"[^\s\d][\w\d]*?"\s*?:\s*?.*?}+)/g;

        if (regex.test(title)) {

            const results = title.match(regex);
            if (results) {
                const json = results.pop();
                result.title = title.replace(json, '');

                try {
                    result.data = JSON.parse(json);
                } catch (e) {
                    console.error("Failed to parse JSON in veeva slide title:", json);
                }
            }
        }

        return result;
    },

    goToSlide(slideId) {
        window.Viewer.api.goToSlide(slideId);
    },

    goToVeevaSlide(vaultExternalSlideId, vaultExternalPresentationId) {
        window.Viewer.api.veeva.goToSlide(vaultExternalSlideId, vaultExternalPresentationId);
    },

    getAllCategories() {
        const categories = this.manifest.matrix.flat().reduce((arr, slide) => {
            const cat = slide.category;
            if (cat && !arr.includes(cat)) {
                arr.push(cat)
            }

            return arr;
        }, []);
        return categories;
    },

    getCurrentPresentationSlides() {
        return window.Viewer.api.getCurrentPresentationSlides();
    },

    getPresentationSlides(presentationId) {

        return window.Viewer.api.veeva.getPresentationSlides(presentationId).then((veevaSlides) => {
            const slides = veevaSlides.map(slide => {
                const idaSlide = {}

                //Grab any meta data from the title (for BMS on Slides this is Description)
                const meta = this.parseMetaDataFromTitle(slide.Key_Message_object_ida__c.Description);

                // Convert the Vault data into the same fields as the IDA objects, so we can use the same template for both
                idaSlide.id = slide.Key_Message_object_ida__c.IDA_Slide_Id_ida__c;
                idaSlide.vaultExternalId = slide.Key_Message_object_ida__c.Vault_External_Id_vod__c;
                idaSlide.title = meta.title;
                idaSlide.image = slide.Key_Message_object_ida__c.Thumbnail_Path_ida__c;
                idaSlide.data = meta.data;
                idaSlide.category = meta.data.category;

                return idaSlide;
            });

            return slides;
        });
    },



    /**
     * The below promises are cached to save us hitting then VEEVA mobile CLM API each time,
     * As the results will never change after the first run
     */

    getAllBriefcaseCategories() {

        if (!this.briefcaseCategories) {
            this.briefcaseCategories = this.getAllBriefcaseSlides().then(slides => {
                return slides.map(slide => slide.category)
            }).then(categories => {
                return Array.from(new Set(categories));
            })
        }

        return this.briefcaseCategories;
    },

    getBriefcaseSlides(category) {
        return this.getAllBriefcaseSlides().then(slides => slides.filter(slide => slide.category == category));
    },

    getAllBriefcaseSlides() {
        if (!this.briefcaseSlides) {
            this.briefcaseSlides = this.getBriefcasePresentations().then((briefcases) => {

                let promises = briefcases.map(briefcase => {
                    return this.getPresentationSlides(briefcase.salesForceId)
                        .then(slides => {
                            slides.forEach(slide => slide.vaultExternalPresentationId = briefcase.vaultExternalId);
                            return slides;
                        })
                });
                return Promise.all(promises).then((slides) => slides.flat());
            });
        }

        return this.briefcaseSlides;
    },

    getBriefcasePresentations() {

        if (!this.briefcases) {
            this.briefcases = this.getAllPresentations().then(presentations => presentations.filter(this.isBriefcase));
        }

        return this.briefcases;

    },

    getPresentations() {
        if (!this.presentations) {
            this.presentations = this.getAllPresentations().then((presentations) => presentations.filter(this.isNotBriefcase));
        }

        return this.presentations;
    },


    getAllPresentations() {

        if (!this.allPresentations) {
            this.allPresentations = window.Viewer.api.veeva.getPresentations().then((veevaPresentations) => {

                return veevaPresentations.map(presentation => {

                    //Grab any meta data from the title (for BMS on Slides this is Description)
                    const meta = this.parseMetaDataFromTitle(presentation.Name);

                    const idaPres = {}
                    // Convert the Vault data into the same fields as the IDA objects, so we can use the same template for both
                    idaPres.id = presentation.IDA_Presentation_Id_ida__c;
                    idaPres.vaultExternalId = presentation.Vault_External_Id_vod__c;
                    idaPres.salesForceId = presentation.Id;
                    idaPres.title = meta.title;
                    idaPres.image = presentation.Clm_Presentation_Slide_vod__c[0].Key_Message_object_ida__c.Thumbnail_Path_ida__c;
                    idaPres.data = meta.data;

                    return idaPres;
                });
            });
        }

        return this.allPresentations;
    },




}