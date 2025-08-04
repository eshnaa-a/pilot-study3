const jsPsych = initJsPsych({
  show_progress_bar: true,
  auto_update_progress_bar: true
});

const group = jsPsych.randomization.sampleWithoutReplacement(["male", "female"], 1)[0];

const logToSheet = trialData => {
  fetch("https://script.google.com/macros/s/AKfycbwYsAlfJ-iaUD5vU93CravpfjDrUwhNtq0ELbQLb8wzLOXfMi0QFKMmkZpsja9lNiYJ3w/exec", {
    method: "POST",
    mode: "no-cors",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify([trialData])
  });
};

const general_instructions = {
  type: jsPsychHtmlKeyboardResponse,
  stimulus: `
    <p>Welcome to the experiment. This experiment will take approximately <strong>30 minutes</strong> to complete.</p>
    <p>Please make sure you are in a quiet space while doing the experiment.</p>
    <p>If you wish to stop at any point, simply close this page and your data will not be recorded.</p>
    <p style="margin-top: 40px;">Press SPACE to continue.</p>
    `,
  choices: [' ']
};

const instructions_part1 = {
  type: jsPsychHtmlKeyboardResponse,
  stimulus: `
    <h2>Instructions</h2>
    <p>In this experiment, alternating trials of images and audio recordings will be presented. For each trial, you will be asked a few questions that you'll answer using a slider on the screen.
    </p>
    <p>Please make sure you are in a quiet space for the audio trials.</p>
    <p style="margin-top: 40px;">Press SPACE to continue to Part 2 instructions.</p>
    `,
  choices: [' ']
};

const exampleImageTrial = {
  type: jsPsychHtmlKeyboardResponse,
  stimulus: `
    <h3>Example Image Stimulus</h3>
    <p><em>Note: This image is <strong>not</strong> part of the actual experiment. It is shown here only for explanation purposes.</em></p>
    <div style="text-align: center;">
      <img src="all_images/example1.png" height="200" alt="Example dog image">
    </div>
    <p><strong>Example question:</strong> How friendly does this dog look to you?</p>
    <p><em>In the real experiment, you will answer questions like this using a Likert scale from 1 (Not friendly at all) to 7 (Very friendly).</em></p>
    <p><strong>Press SPACE to continue.</strong></p>
  `,
  choices: [' ']
};

const exampleAudioTrial = {
  type: jsPsychHtmlKeyboardResponse,
  stimulus: `
    <h3>Example Audio Stimulus</h3>
    <p><em>This audio clip is not part of the actual experiment. It is shown here for explanation purposes only.</em></p>
    <div style="text-align: center; margin-top: 10px; margin-bottom: 20px;">
      <audio controls>
        <source src="all_audios/example1.wav" type="audio/wav">
        Your browser does not support the audio element.
      </audio>
    </div>
    <p><strong>Example question:</strong> How friendly do you think this person sounds?</p>
    <p><em>In the real experiment, you will answer questions like this using a Likert scale from 1 (Not friendly at all) to 7 (Very friendly).</em></p>
    <p><strong>Press SPACE to continue.</strong></p>
  `,
  choices: [' ']
};

const part1Start = {
  type: jsPsychHtmlKeyboardResponse,
  stimulus: `
    <p>The experiment will now begin.</p>
    <p>Press the spacebar to continue.</p>
  `,
  choices: [' ']
};

let timeline = [general_instructions, instructions_part1, exampleImageTrial, exampleAudioTrial, part1Start];

const heightLabels = `
  <div style='display: flex; justify-content: space-between; font-size: 12px;'>
    <span>5'5"</span><span>5'6"</span><span>5'7"</span><span>5'8"</span><span>5'9"</span>
    <span>5'10"</span><span>5'11"</span><span>6'0"</span><span>6'1"</span><span>6'2"</span>
    <span>6'3"</span><span>6'4"</span><span>6'5"</span>
  </div>`;

// === IMAGE BLOCK ===
const makeImageBlock = (facePath) => ({
  timeline: [
    {
      type: jsPsychSurveyHtmlForm,
      preamble: `<img src="${facePath}" height="300"><br>
        <p><b> How dominant do you think this person is? (1 = Not dominant at all, 7 = Very dominant)</b><br>
        <i>Please use your mouse and the slider below to make your selection.</i></p>`,
      html: `<input type='range' name='response' min='1' max='7' step='1' style='width: 100%;'><br>
             <div style='display: flex; justify-content: space-between;'>
               <span>1</span><span>2</span><span>3</span><span>4</span><span>5</span><span>6</span><span>7</span>
             </div>`,
      data: { question: "dominant", stimulus: facePath, modality: "image" },
      on_finish: logToSheet
    },
    {
      type: jsPsychSurveyHtmlForm,
      preamble: `<img src="${facePath}" height="300"><br>
        <p><b> How trustworthy do you think this person is? (1= Not trustworthy at all, 7 = Very trustworthy)</b><br>
        <i>Please use your mouse and the slider below to make your selection.</i></p>`,
      html: `<input type='range' name='response' min='1' max='7' step='1' style='width: 100%;'><br>
             <div style='display: flex; justify-content: space-between;'>
               <span>1</span><span>2</span><span>3</span><span>4</span><span>5</span><span>6</span><span>7</span>
             </div>`,
      data: { question: "trustworthy", stimulus: facePath, modality: "image" },
      on_finish: logToSheet
    },
    {
      type: jsPsychSurveyHtmlForm,
      preamble: `<img src="${facePath}" height="300"><br>
        <p><b> How honest do you think this person is? (1= Not honest at all, 7 = Very honest)</b><br>
        <i>Please use your mouse and the slider below to make your selection.</i></p>`,
      html: `<input type='range' name='response' min='1' max='7' step='1' style='width: 100%;'><br>
             <div style='display: flex; justify-content: space-between;'>
               <span>1</span><span>2</span><span>3</span><span>4</span><span>5</span><span>6</span><span>7</span>
             </div>`,
      data: { question: "honest", stimulus: facePath, modality: "image" },
      on_finish: logToSheet
    },
    {
      type: jsPsychSurveyHtmlForm,
      preamble: `<img src="${facePath}" height="300"><br>
        <p><b> How attractive do you think this person is? (1 = Not attractive at all, 7 = Very attractive)</b><br>
        <i>Please use your mouse and the slider below to make your selection.</i></p>`,
      html: `<input type='range' name='response' min='1' max='7' step='1' style='width: 100%;'><br>
             <div style='display: flex; justify-content: space-between;'>
               <span>1</span><span>2</span><span>3</span><span>4</span><span>5</span><span>6</span><span>7</span>
             </div>`,
      data: { question: "attractive", stimulus: facePath, modality: "image" },
      on_finish: logToSheet
    },
    {
      type: jsPsychSurveyHtmlForm,
      preamble: `<img src="${facePath}" height="300"><br>
        <p><b> How tall do you think this person is?</b><br>
        <i>Please use your mouse and the slider below to make your selection.</i></p>`,
      html: `<input type='range' name='response' min='1' max='13' step='1' style='width: 100%;'><br>${heightLabels}`,
      data: { question: "tall", stimulus: facePath, modality: "image" },
      on_finish: logToSheet
    }
  ]
});

// === AUDIO BLOCK ===
const makeAudioBlock = (audioPath) => ({
  timeline: [
    {
      type: jsPsychSurveyHtmlForm,
      preamble: `<audio controls autoplay><source src="${audioPath}" type="audio/wav"></audio><br>
        <p><b> How dominant do you think this person is, based on their voice? (1 = Not dominant at all, 7 = Very dominant)</b><br>
        <i>Please use your mouse and the slider below to make your selection.</i></p>`,
      html: `<input type='range' name='response' min='1' max='7' step='1' style='width: 100%;'><br>
             <div style='display: flex; justify-content: space-between;'>
               <span>1</span><span>2</span><span>3</span><span>4</span><span>5</span><span>6</span><span>7</span>
             </div>`,
      data: { question: "dominant", stimulus: audioPath, modality: "audio" },
      on_finish: logToSheet
    },
    {
      type: jsPsychSurveyHtmlForm,
      preamble: `<audio controls><source src="${audioPath}" type="audio/wav"></audio><br>
        <p><b> How trustworthy do you think this person is, based on their voice? (1 = Not trustworthy at all, 7 = Very trustworthy)</b><br>
        <i>Please use your mouse and the slider below to make your selection.</i></p>`,
      html: `<input type='range' name='response' min='1' max='7' step='1' style='width: 100%;'><br>
             <div style='display: flex; justify-content: space-between;'>
               <span>1</span><span>2</span><span>3</span><span>4</span><span>5</span><span>6</span><span>7</span>
             </div>`,
      data: { question: "trustworthy", stimulus: audioPath, modality: "audio" },
      on_finish: logToSheet
    },
    {
      type: jsPsychSurveyHtmlForm,
      preamble: `<audio controls><source src="${audioPath}" type="audio/wav"></audio><br>
        <p><b> How honest do you think this person is, based on their voice? (1 = Not honest at all, 7 = Very honest)</b><br>
        <i>Please use your mouse and the slider below to make your selection.</i></p>`,
      html: `<input type='range' name='response' min='1' max='7' step='1' style='width: 100%;'><br>
             <div style='display: flex; justify-content: space-between;'>
               <span>1</span><span>2</span><span>3</span><span>4</span><span>5</span><span>6</span><span>7</span>
             </div>`,
      data: { question: "honest", stimulus: audioPath, modality: "audio" },
      on_finish: logToSheet
    },
    {
      type: jsPsychSurveyHtmlForm,
      preamble: `<audio controls><source src="${audioPath}" type="audio/wav"></audio><br>
        <p><b> How attractive do you think this person is, based on their voice? (1 = Not attractive at all, 7 = Very attractive)</b><br>
        <i>Please use your mouse and the slider below to make your selection.</i></p>`,
      html: `<input type='range' name='response' min='1' max='7' step='1' style='width: 100%;'><br>
             <div style='display: flex; justify-content: space-between;'>
               <span>1</span><span>2</span><span>3</span><span>4</span><span>5</span><span>6</span><span>7</span>
             </div>`,
      data: { question: "attractive", stimulus: audioPath, modality: "audio" },
      on_finish: logToSheet
    },
    {
      type: jsPsychSurveyHtmlForm,
      preamble: `<audio controls><source src="${audioPath}" type="audio/wav"></audio><br>
        <p><b> How tall do you think this person is, based on their voice?</b><br>
        <i>Please use your mouse and the slider below to make your selection.</i></p>`,
      html: `<input type='range' name='response' min='1' max='13' step='1' style='width: 100%;'><br>${heightLabels}`,
      data: { question: "tall", stimulus: audioPath, modality: "audio" },
      on_finish: logToSheet
    },

    {
     type: jsPsychSurveyHtmlForm,
     preamble: `<audio controls><source src="${audioPath}" type="audio/wav"></audio><br>
       <p><b>Does this voice sound more human or robotic to you?</b><br>
       <i>Please use your mouse and the slider below to indicate your response.</i></p>`,
     html: `
       <input type='range' name='response' min='0' max='1' step='1' style='width: 100%;'><br>
       <div style='display: flex; justify-content: space-between;'>
         <span>Human</span><span style="margin-left:auto;">Robotic</span>
       </div>
     `,
     data: { question: "human_voice", stimulus: audioPath, modality: "audio" },
     on_finish: logToSheet
    }
  ]
});

// Blocks set up
const imageBlocks = {
  a: [1, 2, 3],
  b: [4, 5, 6],
  c: [7, 8, 9, 10]
};

const audioBlocks = {
  a: [1, 2, 3, 4, 5, 6],
  b: [7, 8, 9, 10, 11, 12, 13],
  c: [14, 15, 16, 17, 18, 19, 20]
};

function addBlockLabelToTrial(trial, blockLabel) {
  trial.timeline = trial.timeline.map(t => {
    const labelHtml = `<div style="text-align:center; font-size:12px; color:#999; opacity:0.3; position: fixed; top: 5px; left: 50%; transform: translateX(-50%); z-index: 1000;">
                         Block ${blockLabel.toUpperCase()}
                       </div>`;

    if (t.preamble) {
      return {...t, preamble: labelHtml + t.preamble};
    } else if (t.stimulus) {
      return {...t, stimulus: labelHtml + t.stimulus};
    } else {
      return {...t, stimulus: labelHtml};
    }
  });
  return trial;
}

// Helper function to build one block's timeline
const buildStimulusBlock = (imageIDs, audioIDs, blockLabel) => {
  // Shuffle the order of image stimuli IDs within the block
  const shuffledImageIDs = jsPsych.randomization.shuffle(imageIDs);
  // Shuffle the order of audio stimuli IDs within the block
  const shuffledAudioIDs = jsPsych.randomization.shuffle(audioIDs);

  let imageTrials = [];
  shuffledImageIDs.forEach(faceID => {
    // Shuffle variants for each image stimulus
    const variants = jsPsych.randomization.shuffle([1, 2, 3, 4, 5, 6]);
    variants.forEach(v => {
      const path = `all_images/${group}_face${faceID.toString().padStart(2, "0")}_${v}.png`;
      imageTrials.push(addBlockLabelToTrial(makeImageBlock(path), blockLabel));
    });
  });

  let audioTrials = [];
  shuffledAudioIDs.forEach(audioID => {
    // Shuffle pitches for each audio stimulus
    const pitches = jsPsych.randomization.shuffle([1, 2, 3]);
    pitches.forEach(p => {
      const path = `all_audios/${group}_voice${audioID.toString().padStart(2, "0")}_pitch${p}.wav`;
      audioTrials.push(addBlockLabelToTrial(makeAudioBlock(path), blockLabel));
    });
  });

  // Interleave image and audio trials strictly alternating, without shuffling
  let block = [];
  const maxLength = Math.max(imageTrials.length, audioTrials.length);
  for (let i = 0; i < maxLength; i++) {
    if (i < imageTrials.length) block.push(imageTrials[i]);
    if (i < audioTrials.length) block.push(audioTrials[i]);
  }

  return block;  // DO NOT shuffle here
};



// Add "block" label to each trial
const tagBlock = (blockArray, blockLabel) =>
  blockArray.map(trial => ({
    ...trial,
    timeline: trial.timeline.map(t => ({
      ...t,
      data: { ...(t.data || {}), block: blockLabel }
    }))
  }));

const blockA = tagBlock(buildStimulusBlock(imageBlocks.a, audioBlocks.a, "A"), "A");
const blockB = tagBlock(buildStimulusBlock(imageBlocks.b, audioBlocks.b, "B"), "B");
const blockC = tagBlock(buildStimulusBlock(imageBlocks.c, audioBlocks.c, "C"), "C");

const randomizedBlockOrder = jsPsych.randomization.shuffle([
  { name: "A", block: blockA },
  { name: "B", block: blockB },
  { name: "C", block: blockC }
]);

// End of block label
function createEndOfBlockScreen(blockLabel) {
  return {
    type: jsPsychHtmlKeyboardResponse,
    stimulus: `
      <div style="font-size: 24px; text-align: center; margin-top: 100px;">
        <p>End of Block ${blockLabel}</p>
        <p>Take a short break if you need to.</p>
        <p>Press SPACE to continue.</p>
      </div>
    `,
    choices: [' ']
  };
}

for (let i = 0; i < randomizedBlockOrder.length; i++) {
  timeline = timeline.concat(randomizedBlockOrder[i].block);
  if (i < randomizedBlockOrder.length - 1) {
    timeline.push(createEndOfBlockScreen(randomizedBlockOrder[i].name));
  }
}

// === Final Message ===
timeline.push({
  type: jsPsychHtmlKeyboardResponse,
  stimulus: `
    <h2>Thank you for participating!</h2>
    <p>Your responses have been recorded.</p>
    <p>You may now close this window.</p>
  `,
  choices: "NO_KEYS",
  trial_duration: 5000
});

jsPsych.run(timeline);
