import { MDCTextField } from '@material/textfield'
import $ from 'jquery'
import { TranslateProgram } from './custom/TranslateProgram'
import { TranslateComments } from './custom/TranslateComments'
import { ProjectList } from './components/project_list'
import { setImageUploadListener } from './custom/ImageUpload'
import { Program } from './custom/Program'
import { shareProject } from './custom/ProgramShare'
import { ProgramReport } from './custom/ProgramReport'
import { ProgramDescription } from './custom/ProgramDescription'
import { ProgramCredits } from './custom/ProgramCredits'
import { ProgramRecommender } from './custom/ProgramRecommender'
import { ProgramComments } from './custom/ProgramComments'

require('../styles/custom/profile.scss')
require('../styles/custom/modal.scss')
require('../styles/custom/program.scss')

const $project = $('.js-project')
const $projectShare = $('.js-project-share')
const $projectReport = $('.js-project-report')
const $projectDescriptionCredits = $('.js-project-description-credits')
const $projectRecommender = $('.js-project-recommender')
const $projectComments = $('.js-project-comments')

if ($project.data('my-program') === 'true') {
  new MDCTextField(document.querySelector('.description'))
  new MDCTextField(document.querySelector('.credits'))
  new MDCTextField(document.querySelector('.comment-message'))
}

shareProject(
  $projectShare.data('theme-display-name'),
  $projectShare.data('trans-check-out-project'),
  $projectShare.data('project-url'),
  $projectShare.data('trans-share-success'),
  $projectShare.data('trans-share-error'),
  $projectShare.data('trans-copy'),
  $projectShare.data('trans-clipboard-success'),
  $projectShare.data('trans-clipboard-fail')
)

ProgramReport(
  $projectReport.data('project-id'),
  $projectReport.data('path-report'),
  $projectReport.data('path-login'),
  $projectReport.data('trans-success'),
  $projectReport.data('trans-error'),
  $projectReport.data('trans-report'),
  $projectReport.data('trans-cancel'),
  $projectReport.data('trans-header'),
  $projectReport.data('trans-reason'),
  $projectReport.data('trans-inappropriate'),
  $projectReport.data('trans-copyright'),
  $projectReport.data('trans-spam'),
  $projectReport.data('trans-dislike'),
  $projectReport.data('const-ok'),
  $projectReport.data('logged-in')
)

Program(
  $project.data('project-id'),
  $project.data('csrf-token'),
  $project.data('user-role'),
  $project.data('my-program') === 'true',
  $project.data('path-ci-status'),
  $project.data('path-ci-build'),
  $project.data('path-project-like'),
  $project.data('path-like-details'),
  $project.data('trans-apk-prep'),
  $project.data('trans-apk-text'),
  $project.data('trans-update-app-header'),
  $project.data('trans-update-app-text'),
  $project.data('trans-btn-close'),
  $project.data('const-action-add'),
  $project.data('const-action-remove'),
  $project.data('path-profile'),
  $project.data('asset-wow-white'),
  $project.data('asset-wow-black'),
  $project.data('trans-reaction'),
  $project.data('trans-download-error')
)

ProgramDescription(
  $projectDescriptionCredits.data('project-id'),
  $projectDescriptionCredits.data('trans-more-info'),
  $projectDescriptionCredits.data('trans-less-info')
)

ProgramCredits(
  $projectDescriptionCredits.data('project-id')
)

new TranslateProgram(
  $project.data('translated-by-line'),
  $project.data('project-id'),
  $project.data('has-description'),
  $project.data('has-credits')
)

new TranslateComments($project.data('translated-by-line'))

setImageUploadListener($project.data('path-change-image'), '#change-project-thumbnail-button', '#project-thumbnail-big')

initProjects()

function initProjects () {
  const $recommendedProjects = $('#recommended-projects')
  $('.project-list', $recommendedProjects).each(function () {
    const id = $(this).data('project-id')
    const category = $(this).data('category')
    const property = $(this).data('property')
    const theme = $(this).data('theme')
    const flavor = $(this).data('flavor')
    const baseUrl = $(this).data('base-url')

    let url = baseUrl + '/api/project/' + id + '/recommendations?category=' + category

    if (flavor !== 'pocketcode' || category === 'example') {
      // Only the pocketcode flavor shows projects from all flavors!
      // Other flavors must only show projects from their flavor.
      url += '&flavor=' + flavor
    }

    const list = new ProjectList(this, category, url, property, theme)
    $(this).data('list', list)
  })
}

ProgramRecommender($projectRecommender.data('project-id'), $projectRecommender.data('path-click-stats'))

ProgramComments(
  $projectComments.data('project-id'), 5, 5, 5,
  $projectComments.data('total-number-of-comments'),
  $projectComments.data('trans-cancel'),
  $projectComments.data('trans-delete-it'),
  $projectComments.data('trans-report-it'),
  $projectComments.data('trans-are-you-sure'),
  $projectComments.data('trans-no-way-of-return'),
  $projectComments.data('trans-delete-confirmation'),
  $projectComments.data('trans-report-confirmation'),
  $projectComments.data('trans-pop-up-comment-reported-title'),
  $projectComments.data('trans-pop-up-comment-reported-text'),
  $projectComments.data('trans-pop-up-deleted-title'),
  $projectComments.data('trans-pop-up-deleted-text'),
  $projectComments.data('trans-no-admin-rights-message'),
  $projectComments.data('trans-default-error-message'),
)
